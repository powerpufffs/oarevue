import { mount } from "@vue/test-utils";
import wrapperOptions from "../wrapperOptions";

import GroupView from "../../src/components/GroupView";
import flushPromises from "flush-promises";

describe("GroupView.vue", () => {
  let wrapper;
  let groupData;
  beforeEach(() => {
    // Create mock return values
    groupData = {
      id: 1,
      name: "My group",
      users: [
        {
          user_id: 0,
          name: "Barrack Obama",
          email: "bar@rack.obama"
        },
        {
          user_id: 1,
          name: "Joe Biden",
          email: "joe@bid.en"
        }
      ]
    };

    wrapper = mount(GroupView, {
      ...wrapperOptions,
      propsData: {
        groupId: 1
      },
      mocks: {
        $axios: {
          get: path => {
            let route = path.split("/")[1];
            switch (route) {
              case "group":
                return Promise.resolve({ data: groupData });
              case "users":
                return Promise.resolve({ data: [] });
              case "text_text":
                return Promise.resolve({ data: [] });
              case "group_rw":
                return Promise.resolve({
                  data: {
                    group_id: 1,
                    permissions: []
                  }
                });
            }
          }
        }
      }
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Group view displays correct title", async () => {
    await flushPromises();
    let titleTag = wrapper.find("[data-content-title]");
    expect(titleTag.text()).toBe(groupData.name);
  });
});
