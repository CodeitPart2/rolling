import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import ToggleButton from "../../Button/ToggleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputName from "./InputName";
import InputChoiceText from "./InputChoiceText";
import ColorPicker from "../Picker/ColorPicker";
import ImgPicker from "../Picker/ImgPicker";
import Button from "../../Button/Button";
import recipientsService from "../../../../api/services/recipientsService"; // post 해줘야 함

export const Bone = styled.div`
  margin: 3.562rem auto;
  width: 45rem;
  height: 33.875rem;
`;

const Picker = styled.div`
  width: 45rem;
  height: 10.5rem;
  margin-bottom: 4.3125rem;
`;

const StyledButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007BFF")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale[300]};
    color: ${({ theme }) => theme.colors.white};
    cursor: not-allowed;
  }
`;

// To 전체적인 컴포넌
function Input() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState(null);
  const [hasError, setHasError] = useState(false);
  const saveUserName = (value) => {
    setName(value);
  };

  const conditon = name.length >= 2 && !!cardContent && !hasError; // 에러가 없을 때 버튼 활성화

  const handleToggle = (index) => {
    setSelected(index);
  };

  function goToPostId() {
    const requestBody = {
      name: name,
      backgroundColor: selected === 0 && cardContent ? cardContent : "beige",
      backgroundImageURL: selected === 1 && cardContent ? cardContent : null,
      createdAt: new Date().toISOString(),
      messageCount: 0,
      recentMessages: [],
      reactionCount: 0,
      topReactions: [],
    };
    console.log("Request Body:", requestBody);
    recipientsService
      .postRecipients(requestBody)
      .then((response) => {
        const newId = response.data.id;
        console.log(response);
        navigate(`/post/${newId}`);
        console.log("ID 생성:", newId);
      })
      .catch((error) => {
        console.error("ID 생성 실패:", error.response?.data || error.message);
      });
  }
  console.log("cardContent 값.:", cardContent);
  console.log(name);
  console.log(
    "name:",
    name,
    "name.length >= 2:",
    name.length >= 2,
    "cardContent:",
    cardContent,
    "!!cardContent:",
    !!cardContent,
    "hasError:",
    hasError,
    "!hasError:",
    !hasError,
    "conditon:",
    conditon
  );

  return (
    <Bone>
      <InputName // To 입력 값
        value={name}
        onChange={saveUserName}
        onError={setHasError}
      />
      <InputChoiceText />
      <ToggleButton
        options={["컬러", "이미지"]}
        defaultSelected={0}
        onToggle={handleToggle}
      />
      <Picker>
        {selected === 0 && (
          <ColorPicker onSelect={(color) => setCardContent(color)} />
        )}
        {selected === 1 && (
          <ImgPicker onSelect={(img) => setCardContent(img)} />
        )}
      </Picker>
      <StyledButton
        variant="primary"
        size={56}
        width={720}
        onClick={goToPostId}
        state={conditon ? "enabled" : "disabled"}
      >
        생성하기
      </StyledButton>
    </Bone>
  );
}

export default Input;
