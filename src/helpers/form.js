export default function fillDefaultData(data) {
  const formData = {...data}

  formData.status = !!formData.status ? formData.status : 'in_stock';
  formData.booked = formData.booked === undefined ? false : formData.booked;
  formData.listed = formData.listed === undefined ? false : formData.listed;

  formData.year = parseInt(formData.year) || 1900
  formData.msrp = parseInt(formData.msrp) || 0

  return formData
}
