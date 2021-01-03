import { DrawIF } from './EasyCharts';

import 元素 from "./元素";
import 图元 from "./图元"
import 直线元素 from "./直线元素";
import Point from "./Point";

/**
 * 通过输入的数据进行相关的渲染
 */

export default class 折线图元 implements 图元 {
    设置颜色(color: string) {
        this.color = color
        //@ts-ignore
        this.m_draw = null
    }
    constructor() {
        this.显示数字 = true
        this.m_data = []
        this.color = "#ddd"
    }
    渲染(draw: DrawIF) {
        for (let data of this.m_data) {
            data.设置颜色(this.color)
            data.渲染(this.m_draw)
        }
    }
    设置数据(data: Array<Point>) {
        let prePoint = null
        for (const pt of data) {
            if (prePoint) {
                const line = new 直线元素(prePoint, pt)
                this.m_data.push(line)
            }
            prePoint = pt
        }
    }
    初始化基础功能(draw: DrawIF) {
        this.m_draw = draw
    }
    private m_draw!: DrawIF;
    private 显示数字: boolean
    private m_data: Array<元素>
    private color: string
}