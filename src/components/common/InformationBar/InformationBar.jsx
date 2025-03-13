import { useState, useRef } from "react";
import Emoji from "../Emoji/Emoji";
import styled from "styled-components";
import Share from "../../../assets/images/share.png";
import CompleteIcon from "../../../assets/images/completed.png";
import CloseIcon from "../../../assets/images/close.png";

function InformationBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const buttonRef = useRef(null);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "웹사이트 공유 제목",
          description: "웹사이트 설명",
          imageUrl: "https://your-image-url.com", // 공유할 이미지 URL
          link: {
            mobileWebUrl: window.location.href, // 현재 페이지 URL을 자동으로 사용
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "웹사이트 바로가기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 SDK 로드 실패");
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    });
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <InformationBarWrapper>
      <InformationBarContainer>
        <LeftSection>
          <ToName>To. Ashley Kim</ToName>
        </LeftSection>

        <RightSection>
          <WritedContainer>
            <WriteCount>23</WriteCount>
            <WritedText>명이 작성했어요!</WritedText>
          </WritedContainer>

          <SeparatorContainer>
            <Separator />
          </SeparatorContainer>

          <Emoji type="" count={5} />
          <Separator />
          <Button ref={buttonRef} onClick={toggleModal}>
            <ShareIcon src={Share} alt="Share Logo" />
          </Button>
          {isModalOpen && (
            <Modal>
              <Option onClick={shareToKakao}>카카오톡 공유</Option>
              <Option onClick={handleCopyUrl}>URL 공유</Option>
            </Modal>
          )}
        </RightSection>
      </InformationBarContainer>

      {showToast && (
        <Toast>
          <IconTextWrapper>
            <IconWrapper>
              <Complete src={CompleteIcon} alt="CompleteIcon" />
            </IconWrapper>
            <ToastMessage>URL이 복사되었습니다.</ToastMessage>
          </IconTextWrapper>

          <CloseButton onClick={closeToast}>
            <img src={CloseIcon} alt="Close" />
          </CloseButton>
        </Toast>
      )}
    </InformationBarWrapper>
  );
}

const Separator = styled.span`
  display: inline-block;
  width: 1px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.grayScale[300]};
  margin: 0 13px;
`;

const SeparatorContainer = styled.div`
  top: 6px;
  position: relative;
  left: -4px;
`;

const InformationBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InformationBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1207px;
  height: 64px;
  padding: 13px 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const ToName = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.grayScale[800]};
`;

const WritedContainer = styled.div`
  display: inline-flex; /* 인라인 요소처럼 동작하면서 flex 적용 */
  align-items: center; /* 텍스트 정렬 */
`;

const WriteCount = styled.span`
  color: #181818;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0%;
  line-height: 27px;
`;

const WritedText = styled.span`
  color: #181818;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  width: 56px;
  height: 36px;
  border-radius: 6px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 16px;
`;

const ShareIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Modal = styled.div`
  padding: 10px 1px;
  position: absolute;
  top: 122px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 140px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -1%;
  color: ${({ theme }) => theme.colors.grayScale[800]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale[100]};
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 524px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 20px 40px;
  z-index: 100;
`;

const IconTextWrapper = styled.div`
  width: 350px;
  height: 26px;
  display: flex;
  align-items: center;
`;

const ToastMessage = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -1%;
  color: ${({ theme }) => theme.colors.white};
`;

const IconWrapper = styled.div`
  margin-right: 16px;
`;

const Complete = styled.img`
  margin-top: 8px;
  width: 24px;
  height: 24px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 74px;
  img {
    width: 24px;
    height: 24px;
  }
`;

export default InformationBar;
