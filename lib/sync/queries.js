module.exports = {
  getPullRequests: `query ($owner: String!, $repo: String!, $per_page: Int!, $cursor: String) {
    repository(owner: $owner, name: $repo){
      pullRequests(first: $per_page, orderBy: {field: CREATED_AT, direction: DESC}, after: $cursor) {
        edges {
          cursor
          node {
            author {
              avatarUrl
              login
              url
            }
            databaseId
            comments {
              totalCount
            }
            repository {
              url
            }
            baseRef {
              name
            }
            headRef {
              name
            }
            number
            state
            title
            body
            updatedAt
            url
          }
        }
      }
    }
  }`,

  getCommits: `query ($owner: String!, $repo: String!, $per_page: Int!, $cursor: String) {
    repository(owner: $owner, name: $repo){
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: $per_page, after: $cursor) {
              edges {
                cursor
                node {
                  author {
                    avatarUrl
                    email
                    name
                    user {
                      url
                    }
                  }
                  authoredDate
                  message
                  oid
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  `,

  getBranches: `query ($owner: String!, $repo: String!, $per_page: Int!, $cursor: String) {
    repository(owner: $owner, name: $repo) {
      refs(first: $per_page, refPrefix: "refs/heads/", after: $cursor) {
        edges {
          cursor
          node {
            associatedPullRequests(first:1) {
              nodes {
                title
              }
            }
            name
            target {
              ... on Commit {
                author {
                  avatarUrl
                  email
                  name
                }
                authoredDate
                history(first: $per_page) {
                  nodes {
                    message
                    oid
                    authoredDate
                    author {
                      avatarUrl
                      email
                      name
                      user {
                        url
                      }
                    }
                    url
                  }
                }
                oid
                message
                url
              }
            }
          }
        }
      }
    }
  }
  `
}
