import { customAxiosInstance } from '@/utils/axios-config';

export const createStuff = async (values: any) => {
  console.log(values);

  try {
    const { data } = await customAxiosInstance.post('/Stuff/create', {
      title: values['TitlePersian'],
      titleLatin: values['Title'],
      description: values['Description'],
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = async (values: any) => {
  console.log(values);
  try {
  } catch (error) {}
};
