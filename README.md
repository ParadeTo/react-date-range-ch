# react-date-range-ch
对[react-date-range](https://github.com/Adphorus/react-date-range)进行了修改

# 使用
npm intall react-date-range-ch@x.x.x --save
其他请详见[react-date-range](https://github.com/Adphorus/react-date-range)

# 版本说明
## 0.1.0
汉化

## 0.2.0
禁止选择今天之前的日期

## 0.3.0
给Calendar增加两个属性：
* disableDaysBefore 是否禁止选择今天之前的日期
* disableArrow 是否不显示日期控件头部的prev和next按钮

## 0.4.0
给Calendar增加一个属性：
* shownDate 设定日历的当前日期
Calendar.js:
```javascript
const state = {
  date,
  shownDate : (shownDate || range && range['endDate'] || date).clone().add(offset, 'months'), // ayou 2016.11.23人工指定shownDate
  firstDayOfWeek: (firstDayOfWeek || moment.localeData().firstDayOfWeek()),
}
```

## 0.5.0
1.增加/修改参数
Calendar:
* disableDaysBefore->disableDaysBeforeToday  是否禁止选择今天之前的日期
* disableArrow->showMonthArrow 是否不显示日期控件头部的prev和next按钮
* lang 选择日期目前支持中文(cn)，日文(jp)
DateRange:
* offsetPositive 会影响Calendar的生成顺序
```javascript
...
const _calendars = [];
        const _method = offsetPositive ? 'unshift' : 'push';
        for (var i = Number(calendars) - 1; i >= 0; i--) {
          _calendars[_method](
...
```
2.增加字典文件LangDic，目前支持中文，日文
