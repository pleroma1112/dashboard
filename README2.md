### widget ###
각 위젯은 widgetReducer(추후 WDReducer로 변경예정) 에 해당 위젯의 ID와 데이터가 저장됩니다.
이때 API SERVER로 부터 어떤 태그의 데이터를 얻어올지 결정하는 부분의 데이터 형식은 다음과 같습니다.
# example
{
    tagName : ['Test1.PV','Test2.PV'],
    startTime : '2022-03-11T04:58:22.465Z',
    endTime : '2022-03-12T04:58:22.465Z',
    stepSizeSec : 900
}

### API ###
widgetReducer에 저장된 데이터를 참조해서 해당 태그의 정보를 얻어오기 위한 URL은 다음과 같습니다.
# example
url : http://apiserver:port?tagName=Test1.PV&tagName=Test2.PV&startTime=2022-03-11T04:58:22.465Z&endTime=2022-03-11T04:59:22.465Z&stepSizeSec=900

해당 URL을 통해 얻어온 데이터는 다음과 같은 형식을 가지고 있습니다.
# example
[
    [
        {
            tagName : 'Test1.PV',
            timestamp : '2022-03-11T04:58:22.465Z',
            value : 1.2359
        },
        {
            tagName : 'Test1.PV',
            timestamp : '2022-03-11T05:13:22.465Z',
            value : 0.12980
        },
        {
            tagName : 'Test1.PV',
            timestamp : '2022-03-11T05:28:22.465Z',
            value : 3.141592
        },
        .
        .
        .
    ],
    [
        {
            tagName : 'Test2.PV',
            timestamp : '2022-03-11T04:58:22.465Z',
            value : 123.9276
        },
        {
            tagName : 'Test2.PV',
            timestamp : '2022-03-11T05:13:22.465Z',
            value : 200.846
        },
        {
            tagName : 'Test2.PV',
            timestamp : '2022-03-11T05:28:22.465Z',
            value : 213.9987
        },
        .
        .
        .
    ]
]

### 기타 폴더구조 설명 ###

# components
\src\components\card 는 무시하셔도 좋습니다.
\src\components\widget 은 현재 페이지에서 사용되고 있는 widget들이 모여 있는 폴더 입니다.
\src\components\Widget2 은 \src\components\widget 폴더에 있는 위젯들의 개선판 이며 현재 테스트 중입니다.
\src\components\dashboard-layout 은 대쉬보드의 레이아웃을 만들어내는 컴포넌트들의 집합입니다.
\src\components\DashBoard.jsx 는 \src\components\dashboard-layout 폴더의 컴포넌트들을 이용해 대쉬보드를 구성하는 컴포넌트이며 App과 index를 제외한 가장 최상단의 컴포넌트 입니다. 이곳에서 각 url 경로마다 알맞는 페이지가 서비스 됩니다.

# models
\src\models\api 는 \src\components\widget폴더의 widget들이 사용하고 있는 api 요청을 만들어줍니다.
\src\models의 그외 파일은 무시하셔도 좋습니다.

# pages
\src\pages 는 각 경로의 페이지들 저장된 폴더 입니다. 이곳에 저장된 페이지는 사용자가 추가한 페이지가 아니라 기본 페이지 입니다.

\src\pages\routes.js 해당 파일은 경로(route) 마다 어떤 페이지를 보여줄지 결정하는 파일 입니다.
\src\pages\sideMenu.js 해당 파일은 사이드 메뉴의 버튼마다 제목과 클릭시 이동하는 경로를 설정하는 파일입니다. 
위 2개 모두 사용자가 추가한것이 아니라 기본 설정된 것들 입니다.

# reducers
\src\reducers 는 데이터를 저장하는 저장소 입니다.
\src\reducers\rootReducer.js 각 리듀서를 하나로 묶는 리듀서 입니다. 리듀서를 향한 모든 요청은 rootReducer를 거쳐 갑니다.
\src\reducers\authReducer.js 사용자의 인증정보(로그인을 성공했는지 유무)를 저장합니다.
\src\reducers\layoutReducer.js 레이아웃의 정보를 저장합니다.(사이드 메뉴 너비, 헤더 너비, 메인 콘텐츠 크기 등)
\src\reducers\widgetReducer.js 는 \src\components\widget 폴더에서 사용하고 있는 저장소 입니다.

# nginx
\nginx 는 추후 nginx 서비스를 위한 설정파일 및 SSL 인증키를 저장한 폴더 입니다. 무시하셔도 좋습니다.

# dockerfile
dockerfile은 docker로 빌드된 파일을 서비스할때 필요한 파일 입니다. 무시하셔도 좋습니다.





