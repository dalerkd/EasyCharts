import 图层 from "./图层";


export default class EasyCharts {
    constructor() {
        this.m_data = []
        this.m_htmlElementName = ""
    }
    绑定(ele: string) {
        this.m_htmlElementName = ele
    }
    添加图层(data: 图层) {
        this.m_data.push(data)
    }
    private m_htmlElementName: string
    private m_data: Array<图层>
    渲染() {
        for (const it of this.m_data) {
            it.渲染()
        }
    }
}