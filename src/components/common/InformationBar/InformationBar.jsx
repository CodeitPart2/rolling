import Emoji from "../Emoji/Emoji";
import styled from "styled-components";
import Share from "../../../assets/images/share.png";
function InformationBar() {
  return (
    <DomainNav>
      <ToName>
        <span>To. Ashley Kim</span>
      </ToName>

      <CenterSection>
        <span>명이 작성했어요!</span>

        <Emoji type="" count={5} />
        <Button>
          <ShareIcon src={Share} alt="Share Logo" />
        </Button>
      </CenterSection>

      <RightSection></RightSection>
    </DomainNav>
  );
}

const DomainNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
`;
const ShareIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const ToName = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700; /* Bold */
  font-size: 28px;
  line-height: 42px;
  letter-spacing: -0.01em; /* -1% */
  color: #2b2b2b;
  flex: 1;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid #cccccc;
  width: 56px;
  height: 36px;
  border-radius: 6px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 16px;
`;

export default InformationBar;
