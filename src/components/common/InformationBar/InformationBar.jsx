import Emoji from "../Emoji/Emoji";
import styled from "styled-components";
import Share from "../../../assets/images/share.png";

function InformationBar() {
  return (
    <InformationBarWrapper>
      <InformationBarContainer>
        <LeftSection>
          <ToName>To. Ashley Kim</ToName>
        </LeftSection>

        <CenterSection>
          <WritedContainer>
            <WritedText>23명이 작성했어요!</WritedText>
          </WritedContainer>
        </CenterSection>

        <RightSection>
          <Emoji type="" count={5} />
          <Button>
            <ShareIcon src={Share} alt="Share Logo" />
          </Button>
        </RightSection>
      </InformationBarContainer>
    </InformationBarWrapper>
  );
}

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

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 1;
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
  color: #2b2b2b;
`;

const WritedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const WritedText = styled.span`
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
  border: 1px solid #cccccc;
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

export default InformationBar;
