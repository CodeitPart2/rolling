import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";
import EmojiIcon from "../../../assets/images/emoji.png";
import toggle from "../../../assets/images/toggle.png";

const MAX_EMOJIS = 8;
const TOP_EMOJIS = 3;

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
    <ServieContainer>
      <Header>
        <TopEmojisContainer>
          {sortedEmojiMap.slice(0, TOP_EMOJIS).map(([emoji, count]) => (
            <TopEmojiItem key={emoji}>
              <EmojiImage>{emoji}</EmojiImage>
              <EmojiCount>{count}</EmojiCount>
            </TopEmojiItem>
          ))}
        </TopEmojisContainer>

        <ActionsContainer>
          {sortedEmojiMap.length >= 4 && ( // 이모티콘이 4개 이상일 때만 버튼 표시
            <ShowMoreButton onClick={() => setShowAllEmojis(!showAllEmojis)}>
              <Icon src={toggle} alt="아래표시" />
            </ShowMoreButton>
          )}

          <AddButton onClick={() => setShowPicker(!showPicker)}>
            <Icon src={EmojiIcon} alt="EmojiIcon" />
            추가
          </AddButton>
        </ActionsContainer>
      </Header>
      <PickerWrapper>
        {showPicker && (
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            width={306}
            height={392}
          />
        )}
      </PickerWrapper>
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
    </ServieContainer>
  );
}

export default Emoji;
const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ServieContainer = styled.div`
  display: flex;
  position: relative;
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
  position: relative;
  left: -10px;
  display: flex;
  gap: 8px;
  bottom: -5px;
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
  gap: 2px;
  font-size: 20px;
  text-align: center;
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
  position: relative;
  background-color: transparent;
  border: none;
  font-size: ${(props) => props.theme.Typography[20].fontSize};
  cursor: pointer;
  color: ${(props) => props.theme.colors.black};
  width: 36px;
  height: 36px;
  left: -2px;
  padding: 10px;
  bottom: -2px;
`;

const AddButton = styled.button`
  width: 88px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.grayScale[300]};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${(props) => props.theme.Typography[16].fontSize};
  padding: 6px 12px;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.black};
`;

const PickerWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 10;
`;

const AllEmojisContainer = styled.div`
  position: absolute;
  z-index: 5;
  top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  padding: 0.6rem;
`;
const MoreEmojisWrapper = styled.div`
  position: absolute;
  top: -6%;
  right: -60px;
  width: 312px;
  height: auto;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grayScale[300]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
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
  color: ${(props) => props.theme.colors.white};
  padding: 8px 12px;
  gap: 2px;
  font-size: ${(props) => props.theme.Typography[20].fontSize};
  text-align: center;
`;
