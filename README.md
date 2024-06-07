**학번: 2023204063**

**이름: 라현아**

---

활용한 오픈소스들의 목록 및 링크

1. OSS 10. Static Web w/NginX _ 온라인 프로필 카드, 기업 페이지

---

개인 메모

:: `FRONTEND` ::

6/6 
- 전체적인 색감 통일(컬러팔레트)
- 폰트 고려할 것

- abt.html에서 qrcode 이미지 안뜸
- qrcode 파비콘 안뜸

- qr->프로필카드 페이지 안쓰는 버튼 고려해서 디자인
- 나중에 qr페이지 하이퍼링크 색깔 사라졌는지 확인할것


- gnb 메뉴 정리
    전공, 관심분야, SNS, 취미, 포폴, 스킬스택, 시간순의 무언가
- 각 메뉴 html 파일 구성

- 인터랙티브 요소 활용(오픈소스)

- 뉴스 콘텐츠 칸 활용 방법 생각
    포폴 메뉴 안만들고 아래에다가 해도 될것같고 아니면 뉴스콘텐츠 칸을 포폴메뉴로 옮기던가

- 방명록 전체적으로 수정이 필요해보임
- 메시지 전송 안됨
- 방명록 메시지 전송된 칸 배경 이미지 바꿔주기(방명록 메시지 전송된 그 칸 이미지 로딩되는데 오래걸림)
- 방명록 팝업 아이콘 : 텍스트 이모지 말고 파비콘으로
- 작성 메시지가 많아짐에 따라 작성 폼이 안보이는 문제 발생. 스크롤기능 추가할것
- 작성 폼 칸 전체 하단 고정

:: `BACKEND` ::
방명록 메시지 새로고침시 데이터베이스에 있는 내용들 연동?로드? 안됨ㅠ 해야함
포트 : 4000
Docker 레포는 만듦(lagusdk/guestbook)
    `6/6`14장 docker
        31p docker 이미지 만들기
        aws 배포 진행하기
sudo docker images
sudo docker pull lagusdk/guestbook
sudo docker images
sudo docker run -d --rm  -p 4004:4000 lagusdk/guestbook
sudo docker ps
duso docker logs ____

- AWS 탄력적 IP 주소 : 54.80.130.204
- venv vevn~ 로 실행 주소 : localhost:8000