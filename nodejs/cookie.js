var http = require("http");
var cookie = require("cookie");
http
  .createServer(function (request, response) {
    console.log(request.headers.cookie); //쿠키이름들 나옴
    var cookies = {};
    if (request.headers.cookie !== undefined) {
      //쿠키가 있을때는 if문이 필요하지 않는데, 쿠키를 삭제했을경우 오류 발생하기때문에
      // if문 작성해야함
      cookies = cookie.parse(request.headers.cookie); //적절한 객체화시켜서 전달함 !!
    }
    console.log(cookies); //{ a=b; c:d} 이렇게 객체화로 나오고
    console.log(cookies.yummy_cookie); //b 만 나옴

    response.writeHead(200, {
      "Set-Cookie": [
        "yummy_cookie=choco",
        "tasty__cokie=strawberry",
        `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`,
        //max-age는 얼마나 지속될것인가 expire 는 언제죽을건지,,
        //전자로 사용권장!! 그리고 초단위로 가능함 -> 저건 30일!
        "Path=Path; Path=/cookie", // 최상위 /에서는 이게 없고 /create에만 생성
      ],
    });
    response.end("Cookie!!");
  })
  .listen(3000);
