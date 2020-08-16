import EasyCharts from "./EasyCharts"
import 图层 from "./图层"
import 折线图元 from "./折线图元"
import Point from "./Point"



let ec = new EasyCharts()
ec.绑定('#abc')
let 图层A = new 图层()
let 图元 = new 折线图元()

图元.设置数据([new Point(1, 2), new Point(2, 8), new Point(3, 6), new Point(4, 9)])
图层A.添加图元(图元)
ec.添加图层(图层A)
ec.渲染()


