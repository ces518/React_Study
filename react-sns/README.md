# React-SNS Project

- 프론트서버
    - React, Next
    - Redux
    - Redux-saga
    - Styled Components

- 백엔드서버
    - Express
    - MySQL
    - ORM (시퀄라이즈)
    - 패스포트
    - multer(S3)
    - Socket.IO
    
서버 분리 이유 
- 스케일링 이슈
    - 프론트와 백엔드의 역할을 명확하게 구분하여 개발 
    - 프론트에서 하는일이 많을경우 프론트서버만 증설, 반대일경우 백엔드만 증설
    - 단점: 복잡도 증가, CORS 등 이슈 발생
    
Next 사용 이유
- SSR
- 검색엔진 최적화
- 코드스플리팅 (필요한 페이지만 불러오는 기술)

 
