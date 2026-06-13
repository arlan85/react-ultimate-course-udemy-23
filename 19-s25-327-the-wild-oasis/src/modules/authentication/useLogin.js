import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user); // to save auto the user on the cach and have it ther for subsequent request untill needed
      toast.success("Successfully signed in, redirecting...", {
        duration: 400,
      });
      navigate("/dashboard", { replace: true });
    },
    onError: (
      error, //comes from the mutatiion action, so if something happens from the aut service we can see
    ) => toast.error(error.message || "Something happened tryin to logn"),
  });
  return { login, error, isLoading };
}

/**
 * {
    "user": {
        "id": "9111fa47-7601-4d9c-8538-95fa50bd93f3",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "arlan@test.com",
        "email_confirmed_at": "2026-06-13T21:09:53.29816Z",
        "phone": "",
        "confirmed_at": "2026-06-13T21:09:53.29816Z",
        "last_sign_in_at": "2026-06-13T21:28:47.624511418Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {
            "email_verified": true
        },
        "identities": [
            {
                "identity_id": "6faf8e87-4d9e-4653-9866-5c9e27922ac5",
                "id": "9111fa47-7601-4d9c-8538-95fa50bd93f3",
                "user_id": "9111fa47-7601-4d9c-8538-95fa50bd93f3",
                "identity_data": {
                    "email": "arlan@test.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "9111fa47-7601-4d9c-8538-95fa50bd93f3"
                },
                "provider": "email",
                "last_sign_in_at": "2026-06-13T21:09:53.284042Z",
                "created_at": "2026-06-13T21:09:53.284078Z",
                "updated_at": "2026-06-13T21:09:53.284078Z",
                "email": "arlan@test.com"
            }
        ],
        "created_at": "2026-06-13T21:09:53.273743Z",
        "updated_at": "2026-06-13T21:28:47.635271Z",
        "is_anonymous": false
    },
    "session": {
        "access_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImI4MTI2OWYxLTIxZDgtNGYyZS1iNzE5LWMyMjQwYTg0MGQ5MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzQxL2F1dGgvdjEiLCJzdWIiOiI5MTExZmE0Ny03NjAxLTRkOWMtODUzOC05NWZhNTBiZDkzZjMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzgxMzg5NzI3LCJpYXQiOjE3ODEzODYxMjcsImVtYWlsIjoiYXJsYW5AdGVzdC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc4MTM4NjEyN31dLCJzZXNzaW9uX2lkIjoiY2IzYWM0Y2EtOGVlYS00YzYzLWI0OTctNGM3Y2E3N2JmZjliIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.7QVtu5HZUY3sWNV-AOOMQEMC3RSR31MwFBDb_dRGHgSjOd2aUoEmz-z277ko2DuWp2ZdudM3sMWjeQp87c7zYg",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": 1781389727,
        "refresh_token": "37wzftkhudnh",
        "user": {
            "id": "9111fa47-7601-4d9c-8538-95fa50bd93f3",
            "aud": "authenticated",
            "role": "authenticated",
            "email": "arlan@test.com",
            "email_confirmed_at": "2026-06-13T21:09:53.29816Z",
            "phone": "",
            "confirmed_at": "2026-06-13T21:09:53.29816Z",
            "last_sign_in_at": "2026-06-13T21:28:47.624511418Z",
            "app_metadata": {
                "provider": "email",
                "providers": [
                    "email"
                ]
            },
            "user_metadata": {
                "email_verified": true
            },
            "identities": [
                {
                    "identity_id": "6faf8e87-4d9e-4653-9866-5c9e27922ac5",
                    "id": "9111fa47-7601-4d9c-8538-95fa50bd93f3",
                    "user_id": "9111fa47-7601-4d9c-8538-95fa50bd93f3",
                    "identity_data": {
                        "email": "arlan@test.com",
                        "email_verified": false,
                        "phone_verified": false,
                        "sub": "9111fa47-7601-4d9c-8538-95fa50bd93f3"
                    },
                    "provider": "email",
                    "last_sign_in_at": "2026-06-13T21:09:53.284042Z",
                    "created_at": "2026-06-13T21:09:53.284078Z",
                    "updated_at": "2026-06-13T21:09:53.284078Z",
                    "email": "arlan@test.com"
                }
            ],
            "created_at": "2026-06-13T21:09:53.273743Z",
            "updated_at": "2026-06-13T21:28:47.635271Z",
            "is_anonymous": false
        },
        "weak_password": null
    }
}
 */
