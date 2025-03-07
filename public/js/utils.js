export function addSubmitListener(formId, callback) {
  document.getElementById(formId).addEventListener("submit", async (event) => {
    event.preventDefault();
    await callback(event);
  });
}

export async function sendFormAsJson(form, modifiers = []) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  for (const modifier of modifiers) {
    await modifier(data);
  }
  console.log("Form action:", form.action);
  console.log("Form method:", form.method);

  return await fetch(form.action, {
    method: form.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
}

export const passwordEncryptModifier = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  data.password = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 *
 * @parama {Window} window
 */
export function gotoNextOrRoot(window) {
  const params = new URLSearchParams(window.location.search);
  const nextUrl = params.get("next") || "/";
  window.location.assign(nextUrl);
}
