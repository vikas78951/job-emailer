import Template from "@/src/components/common/template";
import Wrapper from "@/src/components/ui/wrapper";
import UserDetails from "@/src/froms/user-details";


export default function page() {
  return (
    <div className="">
      <Wrapper>
        <UserDetails/>
        <Template/>
      </Wrapper>
    </div>
  );
}
