import "../../../../styles/GlobalStyles";
import { textStyle } from "../../../../styles/textStyle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import recipientsService from "../../../../api/services/recipientsService";
import ArrowButton from "../../../common/Button/ArrowButton";
import { useNavigate } from "react-router-dom";
const BoneWrap = styled.div`
  width: 1160px;
  position: relative;
  overflow: hidden;
`;

const BoneContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Bone = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.scrollPosition}px);
  position: relative;
`;

const BackgroundWrap = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["bgColor", "backgroundImageURL"].includes(prop),
})`
  background-color: ${({ bgColor }) => bgColor || "#FFFFFF"};
  background-image: ${({ backgroundImageURL }) =>
    backgroundImageURL ? `url(${backgroundImageURL})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 275px;
  height: 260px;
  padding: 30px 24px;
  border-radius: 1rem;
  color: ${({ backgroundImageURL }) =>
    backgroundImageURL ? "#ffffff;" : "#000000"};
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    transform: scale(1);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.3);
  }
`;
const TextDisplay = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 0.75rem;
`;

const ToText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.625rem;
`;

const WritedContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Avatar = styled.div`
  ${(props) => textStyle(12, 400)(props)}
  right: -6px;
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &:not(:has(img)) {
    background-color: white;
    color: ${({ theme }) => theme.colors.grayScale[800]};
  }
`;

const WriteCount = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const WriteCountDisplay = styled.div`
  display: flex;
  align-items: center;
  ${(props) => textStyle(16, 700)(props)}
`;

const WritedText = styled.div`
  font-size: 14px;
`;

const ArrowButtonDisplay = styled.div`
align-items: center;
   
    transform: translateY(40%);
    z-index: 2;
    transform: matrix(1, 0, 0, 1, 0, 108);
    transition: opacity 0.3s ease;
}
`;
const LeftArrowButtonDisplay = styled(ArrowButtonDisplay)`
  display: ${({ show }) => (show ? "block" : "none")};
  position: relative;
  left: 38px;
  top: 23%;
  transform: translateY(42%);
  z-index: 1;
`;

const RightArrowButtonDisplay = styled(ArrowButtonDisplay)`
  position: relative;
  right: 38px;
  top: 23%;
  transform: translateY(42%);
  z-index: 1;
  display: block;
`;
function CreateAtCardList() {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 295;
  const navigate = useNavigate();
  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  useEffect(() => {
    const loadRecipients = async () => {
      try {
        const response = await recipientsService.getRecipients(
          "/14-8/recipients/"
        );
        const sortedRecipients = response.data.results.sort(
          (a, b) => b.createdAt - a.createdAt
        );

        const updatedRecipients = sortedRecipients.map((recipient) => {
          const images = recipient.recentMessages?.slice(0, 3) || [];
          const imageUrls = images
            .map((msg) => msg.profileImageURL)
            .filter(Boolean);
          return {
            ...recipient,
            profileImages: imageUrls,
          };
        });

        console.log(updatedRecipients);
        setSelectedRecipients(updatedRecipients);
      } catch (error) {
        console.error("받는 사람 데이터를 가져오지 못했습니다:", error);
      }
    };

    loadRecipients();
  }, []);

  const handleNext = () => {
    const maxScroll = -(selectedRecipients.length * cardWidth - 1160);
    setScrollPosition((prev) =>
      prev > maxScroll ? prev - 2 * cardWidth : maxScroll
    );
  };

  const handlePrev = () => {
    setScrollPosition((prev) => (prev < 0 ? prev + 2 * cardWidth : 0));
  };

  const handleCardClick = (id) => {
    // 클릭 시 해당 id로 페이지 이동
    navigate(`/post/${id}`);
  };

  // 좌측 버튼 숨기기 조건
  const showLeftButton = scrollPosition !== 0;
  // 우측 버튼 숨기기 조건
  const showRightButton =
    scrollPosition > -(selectedRecipients.length * cardWidth - 1160);

  return (
    <>
      <LeftArrowButtonDisplay show={showLeftButton}>
        <ArrowButton
          direction="left"
          onClick={handlePrev}
          disabled={scrollPosition === 0}
        />
      </LeftArrowButtonDisplay>
      <BoneWrap>
        <BoneContainer>
          <Bone scrollPosition={scrollPosition}>
            {selectedRecipients.map((recipient, index) => (
              <BackgroundWrap
                key={index}
                bgColor={colorMap[recipient.backgroundColor] || "#FFFFFF"}
                backgroundImageURL={recipient.backgroundImageURL || null}
                onClick={() => handleCardClick(recipient.id)} // 클릭 시 해당 id로 이동
              >
                <div>
                  <TextDisplay>
                    <ToText>To.</ToText>
                    <ToText>
                      {recipient.name === "Unknown"
                        ? "이름 없음"
                        : recipient.name}
                    </ToText>
                  </TextDisplay>
                  <WritedContainer>
                    {recipient.profileImages?.slice(0, 3).map((url, i) => (
                      <Avatar key={i}>
                        <img src={url} alt={`프로필 이미지 ${i + 1}`} />
                      </Avatar>
                    ))}
                    {recipient.messageCount > 3 && (
                      <Avatar>+{recipient.messageCount - 3}</Avatar>
                    )}
                  </WritedContainer>
                  <WriteCountDisplay>
                    <WriteCount>{recipient.messageCount}</WriteCount>
                    <WritedText>명이 작성했어요!</WritedText>
                  </WriteCountDisplay>
                </div>
              </BackgroundWrap>
            ))}
          </Bone>
        </BoneContainer>
      </BoneWrap>
      <RightArrowButtonDisplay show={showRightButton}>
        <ArrowButton
          direction="right"
          onClick={handleNext}
          disabled={
            scrollPosition <= -(selectedRecipients.length * cardWidth - 1160)
          }
        />
      </RightArrowButtonDisplay>
    </>
  );
}

export default CreateAtCardList;
