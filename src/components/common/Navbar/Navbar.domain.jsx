import Emoji from "../Emoji/Emoji";
import styled from "styled-components";

function NavbarDomain() {
  return (
    <DomainNav>
      <ToName>
        <span>To. Ashley Kim</span>
      </ToName>

      <CenterSection>
        <span>23명이 작성했어요!</span>
        <Emoji type="" count={5} />
        <Button>
          <img
            src="./src/images/share.png"
            width="24"
            height="24"
            alt="공유 아이콘"
          />
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

export default NavbarDomain;
