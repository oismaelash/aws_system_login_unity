using Proyecto26;
using UnityEngine;

public class AppManager : MonoBehaviour
{
    [Header("App config")]
    [SerializeField] private string apiUrl;
    [SerializeField] private string tableDynamoDB;
    [Header("Inputs user")]
    [SerializeField] private string usernameUser;
    [SerializeField] private string passwordUser;

    [ContextMenu("Login")]
    private void Login()
    {
        LoginSignupModel loginSignupModel = new LoginSignupModel
        {
            table = tableDynamoDB,
            username = usernameUser,
            password = passwordUser
        };

        string jsonBody = JsonUtility.ToJson(loginSignupModel);

        RestClient.Post(apiUrl, jsonBody).Then(response =>
        {
            print($"response:: {response.Text}");

        }).Catch(error =>
        {
            print($"error:: {error.Message}");
        });
    }

    [ContextMenu("Signup")]
    private void Signup()
    {
        LoginSignupModel loginSignupModel = new LoginSignupModel
        {
            table = tableDynamoDB,
            username = usernameUser,
            password = passwordUser
        };

        string jsonBody = JsonUtility.ToJson(loginSignupModel);

        RestClient.Put(apiUrl, jsonBody).Then(response =>
        {
            print($"response:: {response.Text}");

        }).Catch(error =>
        {
            print($"error:: {error.Message}");
        });
    }
}