export const MINDALL_CRM_SETTINGS = {
  url: 'https://crm.mindall.co/api/api/lead/create/byExternalForm',
  prevent: true,
  formId: '',
  inputs: {
    firstname: '',
    lastname: '',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  },
  meta: {
    orgId: "335d98e7-c2da-4b00-bfd7-b1824314ee95",
    sourceId: "",
    source: '',
  }
}

export const formatData = (formData: any, config: typeof MINDALL_CRM_SETTINGS) => {
  const data = {
    ...formData,
    ...config.meta,
  }

  Object.keys(data).forEach(key => {
    if (data[key] === null || data[key] === '') {
      delete data[key]
    }
  })

  return data
}

export const apiCall = async (data: object, url: string) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}
