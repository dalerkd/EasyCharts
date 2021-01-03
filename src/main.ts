import EasyCharts from "./EasyCharts"
import 图层 from "./图层"
import 折线图元 from "./折线图元"
import Point from "./Point"
import 坐标系图元 from "./坐标系图元"


function load() {
    console.log('Start')
    debugger
    let ec = new EasyCharts()
    ec.绑定('#canvas')
    let 图层A = new 图层()
    let 图元 = new 折线图元()
    let 图层B = new 图层()
    let 坐标系图元A = new 坐标系图元()

    图元.设置数据(
        [
            new Point(2, 1),
            new Point(4, 2),
            new Point(6, 45),
            new Point(8, 4),
            new Point(10, 44),
            new Point(12, 6),
            new Point(14, 2),
            new Point(16, 8),
            new Point(18, 55),
            new Point(20, 2),
            new Point(22, 11),
            new Point(24, 2),
            new Point(26, 13),
            new Point(28, 34),
            new Point(30, 15),
            new Point(32, 16)]
    )
    图元.设置颜色('#2c5bc8')
    图层A.添加图元(图元)
    图层B.添加图元(坐标系图元A)

    ec.添加图层(图层B)
    ec.添加图层(图层A)
    ec.渲染()


    setTimeout(
        function () {
            const x = 1.5
            console.log("设置新比例:", x)
            ec.设置比例(x)
            ec.渲染()
            console.log("设置成功")
        }, 4000)
}

//@ts-ignore
window.addEventListener('load', () => {
    load()
})
