import ProfileInput from "../../components/common/Input/ProfileInput/ProfileInput";
import styled from "styled-components";

const Bone = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  min-height: calc(100vh - 65px);
  width: 100%;
  padding: 47px 24px;
  @media (max-width: 1199px) {
    padding: 49px 24px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

function MessagePage() {
  return (
    <Bone>
      <ProfileInput />
    </Bone>
  );
}

export default MessagePage;
