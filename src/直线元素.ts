import { DrawIF } from './EasyCharts';
import Point from './Point'


export default class 直线元素 {
    constructor(head: Point, end: Point, notifyCallback = true) {
        this.m_headPoint = head
        this.m_endPoint = end
        this.m_color = "#666"
        this.m_notifyCallback = notifyCallback
    }
    private m_notifyCallback: boolean
    private m_headPoint: Point
    private m_endPoint: Point
    private m_color: string
    渲染(draw: DrawIF) {
        draw.Line(this.m_headPoint, this.m_endPoint, this.m_color, this.m_notifyCallback)
    }
    设置颜色(color: string) {
        this.m_color = color
    }

}