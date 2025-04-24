---
title: 배열
date: 2024-04-24
description: JavaScript에서의 배열에 대한 기초지식 내용
slug: array
---

> #### 배열의 기본정의

배열은 여러개의 데이터를 보관하는 역할을 수행하는 객체이다.

```javascript
let number = 3 /* 숫자를 한개만 대입
```

```javascript
let numbers = [1, 2, 3] /* 배열을 이용해 숫자 3개를 대입
```

> 배열을 나타내는 두가지 방법

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
```

```javascript
const arr = new Array(1, 2, 3, 4, 5, 6, 7, 8);
```

> **배열에 대해서 기본적으로 알고 가야 할 것들**

- 각 배열요소는 왼쪽부터 번호가 매겨지며 '인덱스 번호'라고 한다.
- 인덱스번호는 1이 아닌 0부터 시작한다.
- 다양한 유형의 데이터를 포함할 수 있다.

---

코드를 통해서 기본적인 내용들을 복습해보자.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>배열</title>
  </head>
  <body>
    <script>
      const vos = ["박지헌", "최현준", "김경록"];
      console.log(vos);
      // console.log(vos[0])
      // console.log(vos[1])
      // console.log(vos[2])
      vos[0] = "지헌";
      vos[1] = "현준";
      vos[2] = "경록";
      // console.log(vos[0])
      // console.log(vos[1])
      // console.log(vos[2])

      vos.push("윤호");
      console.log(vos);
      vos.pop();
      console.log(vos);
      console.log(vos.indexOf("경록"));
      console.log(vos.indexOf("윤호"));

      vos.splice(0, 1, "박지헌");
      vos.splice(1, 1, "최현준");
      vos.splice(2, 1, "김경록");
      console.log(vos);

      vos.forEach(function (member) {
        console.log("VOS의 " + member);
      });
    </script>
  </body>
</html>
```

하하나 살펴보자.

```javascript
const vos = ["박지헌", "최현준", "김경록"];
```

vos 라는 변수에 배열을 정의하였고 배열은 박지헌, 최현준, 김경록을 요소로 가진다.(문자열 텍스트)

```javascript
console.log(vos[0]);
```

vos 배열 요소중에 첫번째 요소를 출력한다.

```javascript
vos[0] = "강혁";
console.log(vos[0]);
```

배열 첫번째 요소인 박지헌을 강혁으로 다시 선언하고 출력한다.

```javascript
vos.push("윤호");
```

쉽게 생각해서 배열 마지막에 쑤셔넣는다고 보면 된다.

현재 vos 배열에는 "강혁", "최현준", "김경록"이 있는데 이 마지막에 "윤호"를 추가한다.

```javascript
vos.pop();
```

배열의 끝부분부터 지운다고 보면 된다.
위 코드에서는 push로 추가한 "윤호"가 지워지게 된다.

```javascript
console.log(vos.indexOf("경록"));
```

indexOf : 주어진 요소의 유무를 인덱스 번호로 반환하는 것이다.

"경록"이라는 요소는 3번째 (즉 0, 1, 2)에 있으므로

2라는 출력값이 나타난다.

```javascript
console.log(vos.indexOf("나"));
```

"나"라는 요소는 배열안에 없으므로 -1의 값을 출력하게 된다.

```javascript
const fruit = ["apple", "banna", "lemon"];
fruit.splice(0, 1, "melon"); // splice(숫자1, 숫자2, ****)
console.log(fruit);
```

splice 는 인덱스번호 숫자1부터 숫자2 만큼 요소를 지우고 다른요소로 채운다는 것이다.

그럼 위 코드에서는 인덱스번호 0부터이니 "apple"이라는 요소를 지우고 그 자리에 "melon" 이 들어가게 된다.

이제 대망의 마지막이다.

```javascript
const fruits = ["apple", "banana", "cherry"];

fruits.forEach(function (item, index, arr) {
  console.log(`인덱스 ${index}: ${item}`);
});
```

forEach : 배열의 개별 요소에 대한 함수를 차례대로 호출한다.

아직 여기는 정확하게 이해를 못했으니 사진으로 설명을 대체하려고 한다.
