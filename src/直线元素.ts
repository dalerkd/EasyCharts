import Point from './Point'

export default class 直线元素 {
    constructor(head: Point, end: Point) {
        this.m_headPoint = head
        this.m_endPoint = end
        this.m_color = "#666";
    }
    static context: any
    private m_headPoint: Point
    private m_endPoint: Point
    private m_color: string
    渲染() {
        console.log(`绘制从 (${this.m_headPoint.x},${this.m_headPoint.y}) 到 (${this.m_endPoint.x},${this.m_endPoint.y}) 颜色为:${this.m_color}`)
        let canvas = document.getElementById('canvas');
        //@ts-ignore
        canvas.style.border = "1px solid black";
        //@ts-ignore
        if (!canvas.getContext) { return }

        //@ts-ignore
        let context = canvas.getContext("2d");//得到绘图的上下文环境

        const head = this.坐标转换(this.m_headPoint)
        const end = this.坐标转换(this.m_endPoint)

        context.beginPath();//开始绘制线条，若不使用beginPath，则不能绘制多条线条
        context.moveTo(head.x, head.y);//线条开始位置
        context.lineTo(end.x, end.y);//线条经过点
        context.closePath();//结束绘制线条，不是必须的

        context.lineWidth = 3;//设置线条宽度
        context.strokeStyle = this.m_color;//设置线条颜色
        context.stroke();//用于绘制线条
    }
    设置颜色(color: string) {
        this.m_color = color
    }
    坐标转换(point: Point) {
        /**
         * 
         */
        let canvas = document.getElementById('canvas');
        //@ts-ignore
        let h = canvas.height
        //@ts-ignore
        let w = canvas.width

        let realX = point.x * 50 + 40
        let realY = h - point.y * 8 - 40
        return new Point(realX, realY)
    }

}