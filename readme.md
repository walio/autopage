# autopage

用于录入题目并自动生成试卷

## 用户权限

1. 录题人员（只有录入题目的权限）
2. 出卷人员（只能出卷并查看生成试卷但无法查看所有题目）
2. 管理员 （所有权限，只有管理员可以添加或删除权限）

默认新建用户没有任何权限
## 主要用到的第三方库

#### laravel/lumen
#### entrust
#### react
#### ant-design

## 设计理念

1. 尽量保证安全，同时保证一定的灵活性，有时候可能会牺牲一点点性能换取安全和一致性（如使用“外键”）
2. array_map的语义性太差，换成foreach

## todo

1. 存储在localStorage的token是否有被窃取的可能？还有knows是否有被更改的可能？
2. laravel实在是太慢了。。。不过作为小白觉得orm抽象地很不错，很值得学习

## License

[MIT license](http://opensource.org/licenses/MIT)
