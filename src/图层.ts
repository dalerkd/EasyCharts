import { DrawIF } from './EasyCharts';
import 图元 from "./图元";




export default class 图层 {
    constructor() {
        this.m_data = []
        //@ts-ignore
        this.draw = null;
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
    初始化基础功能(draw: DrawIF) {
        this.draw = draw
        for (let data of this.m_data) {
            data.初始化基础功能(this.draw)
        }
    }
    private draw: DrawIF
}