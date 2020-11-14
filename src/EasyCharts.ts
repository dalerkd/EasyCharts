import 图层 from "./图层"
import POINT from "./Point"

export interface DrawIF {
    Line(first: POINT, second: POINT, color: string): void
}


class DrawBase implements DrawIF {
    constructor() {
        this.m_比例 = 1;
    }
    Line(p1: POINT, p2: POINT, color: string) {
        console.log(`绘制从 (${p1.x},${p1.y}) 到 (${p2.x},${p2.y}) 颜色为:${color}`)
        let canvas = document.getElementById('canvas');
        //@ts-ignore
        canvas.style.border = "1px solid black";
        //@ts-ignore
        if (!canvas.getContext) { return }

        //@ts-ignore
        let context = canvas.getContext("2d");//得到绘图的上下文环境

        const head = this.坐标转换(p1)
        const end = this.坐标转换(p2)

        context.beginPath();//开始绘制线条，若不使用beginPath，则不能绘制多条线条
        context.moveTo(head.x, head.y);//线条开始位置
        context.lineTo(end.x, end.y);//线条经过点
        context.closePath();//结束绘制线条，不是必须的

        context.lineWidth = 3;//设置线条宽度
        context.strokeStyle = color;//设置线条颜色
        context.stroke();//用于绘制线条
    }
    private 坐标转换(point: POINT) {
        /**
         * 
         */
        let canvas = document.getElementById('canvas');
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
    constructor() {
        this.m_data = []
        this.m_htmlElementName = ""
        this.m_draw = new DrawBase()
    }
    绑定(ele: string) {
        this.m_htmlElementName = ele
    }
    添加图层(data: 图层) {
        this.m_data.push(data)
    }
    private m_htmlElementName: string
    private m_data: Array<图层>
    private m_draw: DrawBase
    渲染() {
        for (const it of this.m_data) {
            it.渲染(this.m_draw)
        }
    }
    设置比例(比例: number) {
        this.m_draw.设置比例(比例)
    }
}