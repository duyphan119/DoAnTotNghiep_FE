import GroupProductJson from "./GroupProductJson";

type GroupProductHeaderJson = {
  name: string;
  slug: string;
  items: GroupProductJson[];
};

export default GroupProductHeaderJson;
