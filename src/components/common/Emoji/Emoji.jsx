import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";

const MAX_EMOJIS = 8;
const TOPEMOJIS = 3;

function Emoji() {
  const [showPicker, setShowPicker] = useState(false);
  const [emojiMap, setEmojiMap] = useState({});
  const [showAllEmojis, setShowAllEmojis] = useState(false);

  function handleEmojiSelect(emojiObject) {
    setEmojiMap((prevMap) => {
      const updatedMap = { ...prevMap };
      const emoji = emojiObject.emoji;

      updatedMap[emoji] = (updatedMap[emoji] || 0) + 1;

      return updatedMap;
    });
    setShowPicker(false);
  }

  const sortedEmojiMap = Object.entries(emojiMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_EMOJIS);

  return (
    <Container>
      <Header>
        <TopEmojisContainer>
          {sortedEmojiMap.slice(0, TOPEMOJIS).map(([emoji, count]) => (
            <TopEmojiItem key={emoji}>
              <EmojiImage>{emoji}</EmojiImage>
              <EmojiCount>{count}</EmojiCount>
            </TopEmojiItem>
          ))}
        </TopEmojisContainer>

        <ActionsContainer>
          {!showAllEmojis && sortedEmojiMap.length > TOPEMOJIS && (
            <ShowMoreButton onClick={() => setShowAllEmojis(true)}>
              <img src="./src/images/Polygon.png" alt="아래표시" />
            </ShowMoreButton>
          )}
          <AddButton onClick={() => setShowPicker(!showPicker)}>
            <img
              src="./src/images/emoji.png"
              alt="이모티콘"
              width="20"
              height="20"
            />
            추가
          </AddButton>
        </ActionsContainer>
      </Header>

      {showPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}

      {showAllEmojis && (
        <AllEmojisContainer>
          <MoreEmojisWrapper>
            {sortedEmojiMap.map(([emoji, count]) => (
              <AllEmojiItem key={emoji}>
                <EmojiImage>{emoji}</EmojiImage>
                <EmojiCount>{count}</EmojiCount>
              </AllEmojiItem>
            ))}
          </MoreEmojisWrapper>
        </AllEmojisContainer>
      )}
    </Container>
  );
}

export default Emoji;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const TopEmojisContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const TopEmojiItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 63px;
  height: 36px;
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.54);
  color: white;
  padding: 8px 12px;
  gap: 10px;
  font-size: 20px;
  text-align: center; /* 중앙 정렬 */
`;

const EmojiImage = styled.span`
  font-size: 20px;
`;

const EmojiCount = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ShowMoreButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000000;
  width: 36px;
  height: 36px;
  padding: 10px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 6px 12px;
  margin-top: 10px;
  color: black;
`;

// "더보기" 버튼 클릭 시 나타나는 이모티콘 영역
const AllEmojisContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 상위 3개 이모티콘 아래로 내려줌 */
  width: 100%; /* 가로폭을 100%로 설정하여 외부에 배치 */
`;

const MoreEmojisWrapper = styled.div`
  width: 312px;
  height: auto; /* 자동 조절 */
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 24px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개씩 출력 */
  grid-template-rows: repeat(2, auto); /* 2줄 */
  justify-content: center;
  align-items: center;
`;

const AllEmojiItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 63px;
  height: 36px;
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.54);
  color: white;
  padding: 8px 12px;
  gap: 10px;
  font-size: 20px;
  text-align: center; /* 중앙 정렬 */
`;
