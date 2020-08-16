import EasyCharts from "./EasyCharts"
import 图层 from "./图层"
import 折线图元 from "./折线图元"
import Point from "./Point"


function load() {
    let ec = new EasyCharts()
    ec.绑定('#abc')
    let 图层A = new 图层()
    let 图元 = new 折线图元()

    图元.设置数据(
        [
            new Point(1, 1),
            new Point(2, 2),
            new Point(3, 45),
            new Point(4, 4),
            new Point(5, 44),
            new Point(6, 6),
            new Point(7, 2),
            new Point(8, 8),
            new Point(9, 55),
            new Point(10, 2),
            new Point(11, 11),
            new Point(12, 2),
            new Point(13, 13),
            new Point(14, 34),
            new Point(15, 15),
            new Point(16, 16)]
    )
    图元.设置颜色('#2c5bc8')
    图层A.添加图元(图元)
    ec.添加图层(图层A)
    ec.渲染()
}

//@ts-ignore
window.addEventListener('load', () => {
    load()
})
