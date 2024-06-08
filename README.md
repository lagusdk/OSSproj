**학번: 2023204063**

**이름: 라현아**

---

활용한 오픈소스들의 목록 및 링크

1. OSS ch.10 프로필 카드: 공유 가능한 프로필 카드 제작
2. OSS ch.10 기업 페이지: video 삽입

---

:: `자기소개` ::

색상코드
#FFFFFF   #1E0F75   #1C1DAB
#3785D8   #ADC6E5   #BF8CE1
#E893C5   #EBB2C3   #CBD8E8

- 폰트 고려할 것
- qr->프로필카드 페이지 안쓰는 버튼 고려해서 디자인
- gnb 메뉴 정리
    전공, 관심분야, SNS, 취미, 포폴, 스킬스택, 시간순의 무언가
- 인터랙티브 요소 활용(오픈소스)

:: `방명록` ::
- 방명록 전체적으로 수정이 필요해보임
- 방명록 메시지 전송된 칸 배경 이미지 바꿔주기(방명록 메시지 전송된 그 칸 이미지 로딩되는데 오래걸림)
- 방명록 팝업 아이콘 : 텍스트 이모지 말고 파비콘으로

:: `배포` ::
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