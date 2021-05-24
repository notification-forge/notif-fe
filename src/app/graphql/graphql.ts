import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type App = {
  __typename?: 'App';
  appCode?: Maybe<Scalars['ID']>;
  displayName?: Maybe<Scalars['String']>;
  apiToken?: Maybe<Scalars['String']>;
  status?: Maybe<AppStatus>;
  justification?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  primaryOwnerName?: Maybe<Scalars['String']>;
  primaryOwnerId?: Maybe<Scalars['String']>;
  secondaryOwnerName?: Maybe<Scalars['String']>;
  secondaryOwnerId?: Maybe<Scalars['String']>;
  encryptionKey?: Maybe<Scalars['String']>;
  appSettings?: Maybe<Scalars['String']>;
  onboardings?: Maybe<Array<Maybe<Onboarding>>>;
  approvedBy?: Maybe<Scalars['String']>;
  approvedDate?: Maybe<Scalars['Date']>;
  rejectedBy?: Maybe<Scalars['String']>;
  rejectedDate?: Maybe<Scalars['Date']>;
  rejectedReason?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
};

export enum AppStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  PendingOwnerApproval = 'PENDING_OWNER_APPROVAL',
  Rejected = 'REJECTED',
}

export type ApprovalAppInput = {
  appCode?: Maybe<Scalars['String']>;
  status?: Maybe<AppStatus>;
  rejectedReason?: Maybe<Scalars['String']>;
};

export type CloneTemplateVersionInput = {
  templateId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  plugins?: Maybe<Array<Maybe<PluginInput>>>;
};

export type Configuration = {
  __typename?: 'Configuration';
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  fieldType?: Maybe<FieldType>;
  description?: Maybe<Scalars['String']>;
  mandatory?: Maybe<Scalars['Boolean']>;
  allowedOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  validationExpr?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ConfigurationInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CreateAppInput = {
  appCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  justification?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  primaryOwnerName?: Maybe<Scalars['String']>;
  primaryOwnerId?: Maybe<Scalars['String']>;
  secondaryOwnerName?: Maybe<Scalars['String']>;
  secondaryOwnerId?: Maybe<Scalars['String']>;
};

export type CreateTemplateInput = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<MessageType>;
  appCode?: Maybe<Scalars['String']>;
};

export type CreateTemplateVersionInput = {
  templateId?: Maybe<Scalars['ID']>;
};

export enum FieldType {
  String = 'STRING',
  Int = 'INT',
  Long = 'LONG',
  BigInteger = 'BIG_INTEGER',
  BigDecimal = 'BIG_DECIMAL',
  Enum = 'ENUM',
  Boolean = 'BOOLEAN',
}

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['Int']>;
  appCode?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  fileSignature?: Maybe<Scalars['String']>;
  status?: Maybe<ImageStatus>;
  imageData?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
};

export type ImageConnection = {
  __typename?: 'ImageConnection';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<ImageConnectionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ImageConnectionEdge = {
  __typename?: 'ImageConnectionEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Image>;
};

export type ImageSearchFilterInput = {
  fileNamePortion?: Maybe<Scalars['String']>;
  appCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum ImageStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
}

export type Message = {
  __typename?: 'Message';
  id?: Maybe<Scalars['ID']>;
  templateId?: Maybe<Scalars['Int']>;
  templateVersionId?: Maybe<Scalars['Int']>;
  appCode?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  type?: Maybe<MessageType>;
  status?: Maybe<MessageStatus>;
  reason?: Maybe<Scalars['String']>;
  timesTriggered?: Maybe<Scalars['Int']>;
  createdDate?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  template?: Maybe<Template>;
  templateVersion?: Maybe<TemplateVersion>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<MessageConnectionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type MessageConnectionEdge = {
  __typename?: 'MessageConnectionEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Message>;
};

export type MessageInput = {
  templateUUID?: Maybe<Scalars['String']>;
  templateDigest?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  messageType?: Maybe<MessageType>;
};

export enum MessageStatus {
  Pending = 'PENDING',
  Sent = 'SENT',
  Failed = 'FAILED',
}

export enum MessageType {
  Email = 'EMAIL',
  Teams = 'TEAMS',
}

export type Mutation = {
  __typename?: 'Mutation';
  createTemplate: Template;
  updateTemplate: Template;
  createTemplateVersion: TemplateVersion;
  cloneTemplateVersion: TemplateVersion;
  updateTemplateVersion: TemplateVersion;
  uploadImage: Image;
  onboardApp: App;
  updateApp: App;
  approveOrRejectAppInput: App;
  onboardUser: User;
  createMessage: Message;
};

export type MutationCreateTemplateArgs = {
  input: CreateTemplateInput;
};

export type MutationUpdateTemplateArgs = {
  input: UpdateTemplateInput;
};

export type MutationCreateTemplateVersionArgs = {
  input: CreateTemplateVersionInput;
};

export type MutationCloneTemplateVersionArgs = {
  input: CloneTemplateVersionInput;
};

export type MutationUpdateTemplateVersionArgs = {
  input: UpdateTemplateVersionInput;
};

export type MutationUploadImageArgs = {
  appCode?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type MutationOnboardAppArgs = {
  input: CreateAppInput;
};

export type MutationUpdateAppArgs = {
  input: UpdateAppInput;
};

export type MutationApproveOrRejectAppInputArgs = {
  input: ApprovalAppInput;
};

export type MutationOnboardUserArgs = {
  input: OnboardingUserInput;
};

export type MutationCreateMessageArgs = {
  input: MessageInput;
};

export type Onboarding = {
  __typename?: 'Onboarding';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  appCode?: Maybe<Scalars['String']>;
};

export type OnboardingUserInput = {
  appCode?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type PaginationInput = {
  pageNumber?: Maybe<Scalars['Int']>;
  rowPerPage?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
  sortField?: Maybe<Scalars['String']>;
};

export type Plugin = {
  __typename?: 'Plugin';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  appCode?: Maybe<Scalars['String']>;
  configurations?: Maybe<Array<Maybe<Configuration>>>;
  createdDate?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
};

export type PluginInput = {
  pluginId?: Maybe<Scalars['ID']>;
  configurations?: Maybe<Array<Maybe<ConfigurationInput>>>;
};

export type Query = {
  __typename?: 'Query';
  template?: Maybe<Template>;
  templates?: Maybe<TemplateConnection>;
  templateVersion?: Maybe<TemplateVersion>;
  images?: Maybe<ImageConnection>;
  app?: Maybe<App>;
  user?: Maybe<User>;
  plugins?: Maybe<Array<Maybe<Plugin>>>;
  message?: Maybe<Message>;
  messages?: Maybe<MessageConnection>;
};

export type QueryTemplateArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryTemplatesArgs = {
  name?: Maybe<Scalars['String']>;
  appCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
  pageRequestInput?: Maybe<PaginationInput>;
};

export type QueryTemplateVersionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryImagesArgs = {
  searchFilter?: Maybe<ImageSearchFilterInput>;
  pageRequestInput?: Maybe<PaginationInput>;
};

export type QueryAppArgs = {
  appCode?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  username?: Maybe<Scalars['ID']>;
};

export type QueryPluginsArgs = {
  appCode?: Maybe<Scalars['String']>;
};

export type QueryMessageArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryMessagesArgs = {
  name?: Maybe<Scalars['String']>;
  appCode?: Maybe<Scalars['String']>;
  pageRequestInput?: Maybe<PaginationInput>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Template = {
  __typename?: 'Template';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
  type?: Maybe<MessageType>;
  appCode?: Maybe<Scalars['String']>;
  templateVersions?: Maybe<Array<Maybe<TemplateVersion>>>;
  createdDate?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
};

export type TemplateConnection = {
  __typename?: 'TemplateConnection';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<TemplateConnectionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TemplateConnectionEdge = {
  __typename?: 'TemplateConnectionEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Template>;
};

export enum TemplateStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type TemplateVersion = {
  __typename?: 'TemplateVersion';
  id?: Maybe<Scalars['Int']>;
  templateId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  templateDigest?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  status?: Maybe<TemplateStatus>;
  plugins?: Maybe<Array<Maybe<Plugin>>>;
  createdDate?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  template?: Maybe<Template>;
};

export type UpdateAppInput = {
  appCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  justification?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  primaryOwnerName?: Maybe<Scalars['String']>;
  primaryOwnerId?: Maybe<Scalars['String']>;
  secondaryOwnerName?: Maybe<Scalars['String']>;
  secondaryOwnerId?: Maybe<Scalars['String']>;
};

export type UpdateTemplateInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateTemplateVersionInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  status?: Maybe<TemplateStatus>;
  plugins?: Maybe<Array<Maybe<PluginInput>>>;
};

export type User = {
  __typename?: 'User';
  username?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  onboardings?: Maybe<Array<Maybe<Onboarding>>>;
};

export type CreateTemplateMutationVariables = Exact<{
  name: Scalars['String'];
  type: MessageType;
  appCode: Scalars['String'];
}>;

export type CreateTemplateMutation = { __typename?: 'Mutation' } & {
  createTemplate: { __typename?: 'Template' } & Pick<
    Template,
    'name' | 'uuid' | 'type' | 'appCode' | 'createdDate'
  >;
};

export type CreateTemplateVersionMutationVariables = Exact<{
  templateId: Scalars['ID'];
}>;

export type CreateTemplateVersionMutation = { __typename?: 'Mutation' } & {
  createTemplateVersion: { __typename?: 'TemplateVersion' } & Pick<
    TemplateVersion,
    'id' | 'templateId' | 'status'
  >;
};

export type GetAllTemplatesWithPagesQueryVariables = Exact<{
  name: Scalars['String'];
  appCodes?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  pageNumber: Scalars['Int'];
  rowPerPage: Scalars['Int'];
}>;

export type GetAllTemplatesWithPagesQuery = { __typename?: 'Query' } & {
  templates?: Maybe<
    { __typename?: 'TemplateConnection' } & Pick<
      TemplateConnection,
      'totalCount'
    > & {
        edges?: Maybe<
          Array<
            Maybe<
              { __typename?: 'TemplateConnectionEdge' } & {
                node?: Maybe<
                  { __typename?: 'Template' } & Pick<
                    Template,
                    | 'name'
                    | 'type'
                    | 'id'
                    | 'uuid'
                    | 'appCode'
                    | 'lastModifiedDate'
                  >
                >;
              }
            >
          >
        >;
        pageInfo?: Maybe<
          { __typename?: 'PageInfo' } & Pick<
            PageInfo,
            'hasPreviousPage' | 'hasNextPage'
          >
        >;
      }
  >;
};

export type GetTemplateDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetTemplateDetailsQuery = { __typename?: 'Query' } & {
  template?: Maybe<
    { __typename?: 'Template' } & Pick<
      Template,
      'id' | 'name' | 'uuid' | 'type' | 'appCode'
    > & {
        templateVersions?: Maybe<
          Array<
            Maybe<
              { __typename?: 'TemplateVersion' } & Pick<
                TemplateVersion,
                'id' | 'name' | 'status' | 'lastModifiedDate'
              >
            >
          >
        >;
      }
  >;
};

export type GetTemplateVersionDetailsQueryVariables = Exact<{
  templateVersionId: Scalars['ID'];
}>;

export type GetTemplateVersionDetailsQuery = { __typename?: 'Query' } & {
  templateVersion?: Maybe<
    { __typename?: 'TemplateVersion' } & Pick<
      TemplateVersion,
      | 'templateId'
      | 'id'
      | 'name'
      | 'body'
      | 'settings'
      | 'version'
      | 'status'
      | 'createdDate'
      | 'lastModifiedDate'
    > & {
        plugins?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Plugin' } & Pick<
                Plugin,
                | 'id'
                | 'name'
                | 'appCode'
                | 'createdDate'
                | 'createdBy'
                | 'lastModifiedBy'
                | 'lastModifiedDate'
              > & {
                  configurations?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'Configuration' } & Pick<
                          Configuration,
                          | 'name'
                          | 'displayName'
                          | 'fieldType'
                          | 'description'
                          | 'mandatory'
                          | 'allowedOptions'
                          | 'validationExpr'
                          | 'value'
                        >
                      >
                    >
                  >;
                }
            >
          >
        >;
        template?: Maybe<{ __typename?: 'Template' } & Pick<Template, 'type'>>;
      }
  >;
};

export type UpdateTemplateVersionMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  settings: Scalars['String'];
  body: Scalars['String'];
  status: TemplateStatus;
}>;

export type UpdateTemplateVersionMutation = { __typename?: 'Mutation' } & {
  updateTemplateVersion: { __typename?: 'TemplateVersion' } & Pick<
    TemplateVersion,
    'id' | 'templateId' | 'status' | 'name' | 'settings' | 'body'
  >;
};

export const CreateTemplateDocument = gql`
  mutation CreateTemplate(
    $name: String!
    $type: MessageType!
    $appCode: String!
  ) {
    createTemplate(input: { name: $name, type: $type, appCode: $appCode }) {
      name
      uuid
      type
      appCode
      createdDate
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateTemplateGQL extends Apollo.Mutation<
  CreateTemplateMutation,
  CreateTemplateMutationVariables
> {
  document = CreateTemplateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateTemplateVersionDocument = gql`
  mutation CreateTemplateVersion($templateId: ID!) {
    createTemplateVersion(input: { templateId: $templateId }) {
      id
      templateId
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateTemplateVersionGQL extends Apollo.Mutation<
  CreateTemplateVersionMutation,
  CreateTemplateVersionMutationVariables
> {
  document = CreateTemplateVersionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetAllTemplatesWithPagesDocument = gql`
  query GetAllTemplatesWithPages(
    $name: String!
    $appCodes: [String!]
    $pageNumber: Int!
    $rowPerPage: Int!
  ) {
    templates(
      name: $name
      appCodes: $appCodes
      pageRequestInput: {
        pageNumber: $pageNumber
        rowPerPage: $rowPerPage
        sortDirection: DESC
        sortField: "createdDate"
      }
    ) {
      totalCount
      edges {
        node {
          name
          type
          id
          uuid
          appCode
          lastModifiedDate
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllTemplatesWithPagesGQL extends Apollo.Query<
  GetAllTemplatesWithPagesQuery,
  GetAllTemplatesWithPagesQueryVariables
> {
  document = GetAllTemplatesWithPagesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetTemplateDetailsDocument = gql`
  query GetTemplateDetails($id: ID!) {
    template(id: $id) {
      id
      name
      uuid
      type
      appCode
      templateVersions {
        id
        name
        status
        lastModifiedDate
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetTemplateDetailsGQL extends Apollo.Query<
  GetTemplateDetailsQuery,
  GetTemplateDetailsQueryVariables
> {
  document = GetTemplateDetailsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetTemplateVersionDetailsDocument = gql`
  query GetTemplateVersionDetails($templateVersionId: ID!) {
    templateVersion(id: $templateVersionId) {
      templateId
      id
      name
      body
      settings
      version
      status
      createdDate
      lastModifiedDate
      plugins {
        id
        name
        appCode
        configurations {
          name
          displayName
          fieldType
          description
          mandatory
          allowedOptions
          validationExpr
          value
        }
        createdDate
        createdBy
        lastModifiedBy
        lastModifiedDate
      }
      template {
        type
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetTemplateVersionDetailsGQL extends Apollo.Query<
  GetTemplateVersionDetailsQuery,
  GetTemplateVersionDetailsQueryVariables
> {
  document = GetTemplateVersionDetailsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateTemplateVersionDocument = gql`
  mutation UpdateTemplateVersion(
    $id: ID!
    $name: String!
    $settings: String!
    $body: String!
    $status: TemplateStatus!
  ) {
    updateTemplateVersion(
      input: {
        id: $id
        name: $name
        settings: $settings
        body: $body
        status: $status
      }
    ) {
      id
      templateId
      status
      name
      settings
      body
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateTemplateVersionGQL extends Apollo.Mutation<
  UpdateTemplateVersionMutation,
  UpdateTemplateVersionMutationVariables
> {
  document = UpdateTemplateVersionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
