
export const config = {
    baseUrl:'https://arcmate10.nvssoft.cloud/AMService10' ,
    getRepository:'api/AMLight/RepositoriesGet',
    openRepository:'api/AMLight/RepositoryOpen',
    closeRepository:"api/Repository/RepositoryClose?LoginId={LoginId}",
    getDocumentTypes:"api/DocumentType/DocumentTypeGetList"
    
}