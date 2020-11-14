import { DrawIF } from './EasyCharts';
import 图元 from "./图元";




export default class 图层 {
    constructor() {
        this.m_data = []
    }
    private m_data: Array<图元>
    渲染(draw: DrawIF) {
        for (const it of this.m_data) {
            it.渲染(draw)
        }
    }
    添加图元(data: 图元) {
        this.m_data.push(data)
    }
}