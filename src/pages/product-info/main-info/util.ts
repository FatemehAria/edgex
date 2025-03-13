import { customAxiosInstance } from '@/utils/axios-config';

export const createStuff = async (values: any) => {
  console.log(values);

  try {
    const { data } = await customAxiosInstance.post('/Stuff/create', {
      title: values['product-info-title-persian'],
      titleLatin: values['product-info-title-english'],
      description: values['product-specification-desc'],
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
