import { DrawIF } from './EasyCharts';

import 元素 from "./元素";
import 图元 from "./图元"
import 直线元素 from "./直线元素";
import Point from "./Point";

/**
 * 通过输入的数据进行相关的渲染
 */

export default class 坐标系图元 implements 图元 {
    设置颜色(color: string) {
        this.color = color
        //@ts-ignore
        this.m_draw = null
    }
    constructor() {
        this.显示数字 = true
        this.m_data = []
        this.color = "#a98"
        this.maxPoint = new Point(10, 10)
        this.minPoint = new Point(0, 0)
    }
    渲染(draw: DrawIF) {
        for (let data of this.m_data) {
            data.设置颜色(this.color)
            data.渲染(this.m_draw)
        }
    }
    // TODO: 未注册 如何注册?
    极值回调(maxPoint: Point, minPoint: Point, draw: DrawIF) {
        //设置为新的坐标值
        this.设置数据(maxPoint, minPoint)
        this.m_draw.RePaint()
    }
    设置数据(maxPoint: Point, minPoint: Point): void {
        this.maxPoint = maxPoint
        this.minPoint = minPoint
        /**
         * 通过 max min 数据 计算出 m_data中需要 一个坐标系 边框 图形坐标
         */
        this.m_data = []
        this.m_data.push(new 直线元素(new Point(0, 0), new Point(maxPoint.x + 5, 0)))
        this.m_data.push(new 直线元素(new Point(0, 0), new Point(0, maxPoint.y + 5)))

    }
    初始化基础功能(draw: DrawIF) {
        this.m_draw = draw
        //@ts-ignore
        this.m_draw.RegisterExtreme(this.极值回调)
    }
    private m_draw !: DrawIF
    private maxPoint: Point
    private minPoint: Point
    private 显示数字: boolean
    private m_data: Array<元素>
    private color: string
}