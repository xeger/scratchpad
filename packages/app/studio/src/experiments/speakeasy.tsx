import { SDK } from "atlas";
import { Organization } from "atlas/models/components";
import { useEffect, useState } from "react";

const userId = import.meta.env.VITE_ATLAS_USER_ID;
const accessToken = import.meta.env.VITE_ATLAS_ACCESS_TOKEN;

const sdk = new SDK({
  oauth2HeaderAuthorization: `Bearer ${accessToken}`,
  serverURL: window.origin,
});

/**
 * Given a Speakeasy response object, verify a 200 status and a truth parsed-response field
 * of the given name; return the parsed response field, preserving its type identity but removing
 * any union with null or undefined.
 */
function assert200<
  TResponse extends { statusCode: number },
  TField extends keyof TResponse,
>(response: TResponse, field: TField) {
  if (response.statusCode === 200) {
    if (response[field]) {
      return response[field] as NonNullable<TResponse[TField]>;
    } else {
      throw new Error(`HTTP request did not respond properly`);
    }
  } else {
    throw new Error(`HTTP request failed: ${response.statusCode}`);
  }
}

function UserOrgList() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    sdk.iam
      .listUserOrgs(userId)
      .then((response) => assert200(response, "organizationCollection"))
      .then(setOrgs)
      .catch(setError);
  }, []);

  if (error) {
    return <span className=""></span>;
  } else {
    return (
      <ul className="list-disc list-inside">
        {orgs.map((org) => (
          <li key={org.organizationId}>{org.displayName}</li>
        ))}
      </ul>
    );
  }
}

export { UserOrgList };
