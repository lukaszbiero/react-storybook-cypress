import { Story, Meta } from '@storybook/react/types-6-0';
import { ACCOUNT_TYPES } from './misc/settings';
import { UserData } from './user-data.component';
import { IUserData } from './user.data.types';

interface TemplateProps extends IUserData {}

const CHANGE_PERSONAL_DATA_URL = 'https://my.api/front/api/v1/user/personal';
const GET_DATA_URL = 'https://my.api/front/api/v1/user/me';
const prepareMock = ({ url = '', response = {}, status = 200, method = 'PUT' }) => ({
  url,
  method,
  status,
  response,
});

export default {
  title: 'Default',
  component: UserData,
  args: {},
  argTypes: {},
} as Meta;

const Template: Story<TemplateProps> = ({ ...args }) => {
  return (
    <UserData {...args} />
  );
};

const mockSaveDataSuccessResponse = {
  mockData: [
    prepareMock({
      url: CHANGE_PERSONAL_DATA_URL,
      status: 200,
      response: {
        ok: true,
      },
    }),
  ],
};

const getUserMockData = (extraData = {}) => ({
  mockData: [
    ...mockSaveDataSuccessResponse.mockData,
    prepareMock({
      url: GET_DATA_URL,
      status: 200,
      method: 'GET',
      response: {
        name: 'John Doe',
        phone: '+44 500 500 500',
        ...extraData,
      },
    }),
  ],
});

const userMockEmptyData = getUserMockData({
  name: '',
  phone: '',
});
const userMockData = getUserMockData();
const userMockDataWithUserName = getUserMockData({ username: 'JohnDoeMaster' });

const defaultArgs = {
 accountType: ACCOUNT_TYPES.RETAIL
}

const defaultParams = {
  ...userMockData
}

export const EmptyData = Template.bind({});
EmptyData.args = {
  ...defaultArgs,
};
EmptyData.parameters = {
  ...userMockEmptyData,
};


export const WithUsername = Template.bind({});
WithUsername.args = {
  ...defaultArgs,
};
WithUsername.parameters = {
  ...userMockDataWithUserName,
};

export const BusinessAccount = Template.bind({});
BusinessAccount.args = {
  ...defaultArgs,
  accountType: ACCOUNT_TYPES.BUSINESS
};
BusinessAccount.parameters = {
  ...defaultParams,
};


export const WithMockSaveDataSuccessResponseMsg = Template.bind({});
WithMockSaveDataSuccessResponseMsg.args = {
  ...defaultArgs,
};
WithMockSaveDataSuccessResponseMsg.parameters = {
  mockData: [
    ...defaultParams.mockData,
    prepareMock({
      url: CHANGE_PERSONAL_DATA_URL,
      status: 200,
      response: {
        ok: true,
        message: 'Data was changed'
      },
    }),
  ],
};

export const WithMockSaveDataInternalErrorResponseMsg = Template.bind({});
WithMockSaveDataInternalErrorResponseMsg.args = {
  ...defaultArgs,
};
WithMockSaveDataInternalErrorResponseMsg.parameters = {
  mockData: [
    prepareMock({
      url: CHANGE_PERSONAL_DATA_URL,
      method: "GET",
      status: 500
    }),
  ],
}

export const WithMockSaveDataErrorResponseMsg = Template.bind({});
WithMockSaveDataErrorResponseMsg.args = {
  ...defaultArgs,
};
WithMockSaveDataErrorResponseMsg.parameters = {
  mockData: [
    ...userMockData.mockData,
    prepareMock({
      url: CHANGE_PERSONAL_DATA_URL,
      status: 400,
      response: {
        ok: false,
        message: 'Validation API error'
      },
    }),
  ],
};
