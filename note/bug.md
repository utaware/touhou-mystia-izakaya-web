# bug

> 记录一些开发中遇到的~~小问题~~

## vue

> 使用Naive-ui modal组件过程中, 切换模态框显示隐藏时都会出现该错误。

```js
// [vue warn] Set operation on key "_ctx" failed: target is readonly.

{
  "naive-ui": "^2.38.1",
  "vue": "^3.4.21",
}
```

- 修改modal调用方式, 传递参数, 简化模板关系, 使用官方示例 ✖️

> 百度上类似的问题较多，但略有差别，出现问题的key在于自身逻辑代码的实现，所产生的报错提示。无果顺着github issue查找，发现[ant-design-vue#3998][1]也出现过，开始考虑版本问题

- 版本降级: `naive-ui` -> `2.37.3` ✖️

> `2.38.0`新增了命令式 API 的选项，这个版本号太近，于是降级尝试了一下，并没有解决。考虑useModal情况也许会不一样，但即便解决也和眼下的问题和实现方式有所差别。虽然他只是一个warning，但...~~强迫症是真的很难受~~，再从新从报错信息入手，关键点`readonly`，`_ctx`，`renderFnWithContext`。怎么看都和渲染有关，查看`modal`的渲染函数并没有类似的改动。

- 修改slot相关结构 ✖️

> 依旧没有成功，但通过报错的target对象来看，由于这次插槽方式有所改变，报错对象从`default`多了其他属性，和插槽名不谋而合。再回到`modal`实现发现插槽部分也是改动的影子都没有，快受不了了。

- googl: `vue` -> `3.4.25` ✔️

> 前两个直接是最近的[issue][2], 原因图上有贴，其实通过报错也能猜出来了。但之前一直猜想是UI框架的问题...~~有人遇到同样的问题真是太好啦~~。正好看到后面有解决，升级版本！~~出狱~~

[1]: https://github.com/vueComponent/ant-design-vue/issues/3998
[2]: https://github.com/vuejs/core/issues/10709