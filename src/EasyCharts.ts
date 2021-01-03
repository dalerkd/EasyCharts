import 图层 from "./图层"
import POINT from "./Point"
import Point from "./Point";

type NotifyCallback = (max: Point, min: Point) => void

export interface DrawIF {
    Line(first: POINT, second: POINT, color: string, notifyCallback?: boolean): void
    RePaint(): void//添加重绘任务,将在本轮绘制结束后进行
    RegisterExtreme(cb: NotifyCallback): void//注册极限值回调
}

class DrawBase implements DrawIF {
    constructor(rePaint: () => void) {
        this.m_htmlElementName = ""
        this.m_比例 = 1
        this.m_extreme_min = new POINT(0, 0)
        this.m_extreme_max = new POINT(0, 0)
        this.m_extreme_cb_list = new Array()
        this.RePaint = rePaint
    }
    setHtmlElementName(nodeName: string) {
        this.m_htmlElementName = nodeName
    }
    private m_htmlElementName: string

    RePaint(): void {
        throw ("不应该触发本代码")
    }
    clear渲染() {
        let canvas = document.querySelector(this.m_htmlElementName)
        //@ts-ignore
        canvas.style.border = "1px solid black"
        //@ts-ignore
        if (!canvas.getContext) { return }
        //@ts-ignore
        let context = canvas.getContext("2d")//得到绘图的上下文环境
        //@ts-ignore
        context.height = context.height
    }

    Line(p1: POINT, p2: POINT, color: string, notifyCallback = true) {
        console.log(`绘制从 (${p1.x},${p1.y}) 到 (${p2.x},${p2.y}) 颜色为:${color}`)
        let canvas = document.querySelector(this.m_htmlElementName)
        //@ts-ignore
        canvas.style.border = "1px solid black"
        //@ts-ignore
        if (!canvas.getContext) { return }
        //@ts-ignore
        let context = canvas.getContext("2d")//得到绘图的上下文环境

        const head = this.坐标转换(p1)
        const end = this.坐标转换(p2)

        context.beginPath();//开始绘制线条，若不使用beginPath，则不能绘制多条线条
        context.moveTo(head.x, head.y);//线条开始位置
        context.lineTo(end.x, end.y);//线条经过点
        context.closePath();//结束绘制线条，不是必须的

        context.lineWidth = 3;//设置线条宽度
        context.strokeStyle = color;//设置线条颜色
        context.stroke();//用于绘制线条

        if (notifyCallback) {
            let pointMax = new Point(0, 0);
            let pointMin = new Point(0, 0);
            if (head.x >= end.x) {
                pointMax.x = head.x
                pointMax.y = head.y
                pointMin.x = end.x
                pointMin.y = end.y
            } else {
                pointMax.x = end.x
                pointMax.y = end.y
                pointMin.x = head.x
                pointMin.y = head.y
            }
            this.极限值管理(pointMax, pointMin)
        }
    }
    /**
     * 如果新的极限值 超过老的极限值将会 触发 回调
     * {pointMax Min} 这两个坐标是由 绘制方法 动态计算的
     * 
     */
    private 极限值管理(pointMax: POINT, pointMin: POINT) {
        let change: Boolean = false
        if (pointMax.x > this.m_extreme_max.x) {
            this.m_extreme_max.x = pointMax.x
            change = true
        }
        if (pointMax.y > this.m_extreme_max.y) {
            this.m_extreme_max.y = pointMax.y
            change = true
        }
        if (pointMin.x < this.m_extreme_min.x) {
            this.m_extreme_min.x = pointMin.x
            change = true
        }
        if (pointMin.y < this.m_extreme_min.y) {
            this.m_extreme_min.y = pointMin.y
            change = true
        }
        if (change) {
            this.m_extreme_cb_list.forEach(element => {
                element(this.m_extreme_max, this.m_extreme_min)
            });
        }

    }

    private m_extreme_cb_list: Array<NotifyCallback>;//极限值通知回调...
    RegisterExtreme(cb: NotifyCallback) {
        this.m_extreme_cb_list.push(cb)
    }
    private m_extreme_min: POINT
    private m_extreme_max: POINT
    private 坐标转换(point: POINT) {
        /**
         * 
         */
        let canvas = document.querySelector(this.m_htmlElementName);
        //@ts-ignore
        let h = canvas.height
        //@ts-ignore
        let w = canvas.width

        let realX = point.x * 50 * this.m_比例 + 40
        let realY = h - point.y * 8 * this.m_比例 - 40
        return new POINT(realX, realY)
    }
    public 设置比例(比例: number) {
        this.m_比例 = 比例
    }
    private m_比例: number
}


export default class EasyCharts {
    constructor(htmlElementName?: string) {
        this.m_data = []
        this.m_draw = new DrawBase(this.getRePaint)
        this.m_rePaint = true
        if (htmlElementName)
            this.绑定(htmlElementName)
    }
    绑定(ele: string) {
        this.m_draw.setHtmlElementName(ele)
    }
    添加图层(data: 图层) {
        data.初始化基础功能(this.m_draw)
        this.m_data.push(data)
    }
    private m_data: Array<图层>
    private m_draw: DrawBase
    // 是否重绘
    private m_rePaint: boolean
    setRePaint(b: boolean) {
        this.m_rePaint = b
    }
    getRePaint(): boolean {
        return this.m_rePaint
    }
    渲染() {
        while (this.getRePaint()) {
            this.m_draw.clear渲染()
            this.setRePaint(false)
            for (const it of this.m_data) {
                it.渲染(this.m_draw)
            }
        }
        this.setRePaint(true)
    }
    设置比例(比例: number) {
        this.m_draw.设置比例(比例)
    }
}