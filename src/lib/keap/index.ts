import { ContactCreationData } from "./types";

const API_BASE_URL = "https://api.infusionsoft.com/crm/rest/v1";
const API_KEY = process.env.INFUSIONSOFT_API_KEY;
const TAG_ID = 2603;

const endpoints = {
  contacts: {
    post: (data: Omit<ContactCreationData, "company"> & { company?: number }) =>
      fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "X-Keap-API-Key": API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_type: "API",
          email_addresses: [
            {
              email: data.email,
              field: "EMAIL1",
            },
          ],
          phone_numbers: [
            {
              number: data.phone,
              field: "PHONE1",
            },
          ],
          given_name: data.first_name,
          family_name: data.last_name,
          company: data.company,
          job_title: data.activity,
        }),
      })
        .then((response) => response.json())
        .then((data) => data.id as number | undefined),
  },
  companies: {
    post: (data: { company_name: string }) =>
      fetch(`${API_BASE_URL}/companies`, {
        method: "POST",
        headers: {
          "X-Keap-API-Key": API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => data.id as number | undefined),
  },
  applyTags: {
    post: (data: { contact_id: number; tag_id: number }) =>
      fetch(`${API_BASE_URL}/contacts/${data.contact_id}/tags`, {
        method: "POST",
        headers: {
          "X-Keap-API-Key": API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tagIds: [data.tag_id],
        }),
      }),
  },
};

export const saveContact = async (data: ContactCreationData) => {
  const createdCompanyId = data.company
    ? await endpoints.companies.post({
        company_name: data.company,
      })
    : undefined;

  console.log("createdCompanyId", createdCompanyId);

  const createdContactId = await endpoints.contacts.post({
    ...data,
    company: createdCompanyId,
  });

  console.log("createdContactId", createdContactId);

  if (createdContactId) {
    await endpoints.applyTags.post({
      contact_id: createdContactId,
      tag_id: TAG_ID,
    });
  }

  return createdContactId;
};
