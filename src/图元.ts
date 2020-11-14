import { DrawIF } from './EasyCharts';
import 元素 from "./元素";

/**
 * 图元 承载了 元素的组合
 * 比如折线
 * 
 * 还记载了一些其他属于：如点是否增强
 * 渲染方式
 */
export default interface 图元 {
    渲染(draw: DrawIF): void;
    设置数据(arg0: any): void;
}
