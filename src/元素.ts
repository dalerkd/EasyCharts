import { DrawIF } from './EasyCharts';



export default interface 元素 {
    渲染(draw: DrawIF): void;
    设置颜色(args: string): void;
}

