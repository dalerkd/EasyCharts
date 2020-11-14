import { DrawIF } from './EasyCharts';
import Point from './Point'


export default class 直线元素 {
    constructor(head: Point, end: Point) {
        this.m_headPoint = head
        this.m_endPoint = end
        this.m_color = "#666"
    }
    private m_headPoint: Point
    private m_endPoint: Point
    private m_color: string
    渲染(draw: DrawIF) {
        draw.Line(this.m_headPoint, this.m_endPoint, this.m_color)
    }
    设置颜色(color: string) {
        this.m_color = color
    }

}