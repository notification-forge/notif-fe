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

export enum AlertType {
  Teams = 'TEAMS',
  Email = 'EMAIL',
}

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
  alertType?: Maybe<AlertType>;
  appCode?: Maybe<Scalars['String']>;
};

export type CreateTemplateVersionInput = {
  templateId?: Maybe<Scalars['ID']>;
};

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['ID']>;
  appCode?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  tenant?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  fileSignature?: Maybe<Scalars['String']>;
  status?: Maybe<ImageStatus>;
  imageData?: Maybe<Scalars['String']>;
};

export type ImagePages = {
  __typename?: 'ImagePages';
  totalElements?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
  content?: Maybe<Array<Maybe<Image>>>;
  isEmpty?: Maybe<Scalars['Boolean']>;
  isFirst?: Maybe<Scalars['Boolean']>;
  isLast?: Maybe<Scalars['Boolean']>;
  number?: Maybe<Scalars['Int']>;
  numberOfElements?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sort>;
};

export enum ImageStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
}

export type Mutation = {
  __typename?: 'Mutation';
  createTemplate: Template;
  updateTemplate: Template;
  createTemplateVersion: TemplateVersion;
  cloneTemplateVersion: TemplateVersion;
  updateTemplateVersion: TemplateVersion;
  uploadImage: Image;
  onboardApp: Tenant;
  updateApp: Tenant;
  approveOrRejectAppInput: Tenant;
  onboardUser: User;
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

export type PaginationInput = {
  pageNumber?: Maybe<Scalars['Int']>;
  rowPerPage?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
  sortField?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  template?: Maybe<Template>;
  templatePages?: Maybe<TemplatePages>;
  templateVersion?: Maybe<TemplateVersion>;
  imagePages?: Maybe<ImagePages>;
  tenant?: Maybe<Tenant>;
  user?: Maybe<User>;
};

export type QueryTemplateArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryTemplatePagesArgs = {
  name?: Maybe<Scalars['String']>;
  appCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
  paginationInput?: Maybe<PaginationInput>;
};

export type QueryTemplateVersionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryImagePagesArgs = {
  name?: Maybe<Scalars['String']>;
  appCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
  paginationInput?: Maybe<PaginationInput>;
};

export type QueryTenantArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  username?: Maybe<Scalars['ID']>;
};

export type Sort = {
  __typename?: 'Sort';
  isSorted?: Maybe<Scalars['Boolean']>;
  isUnsorted?: Maybe<Scalars['Boolean']>;
  isEmpty?: Maybe<Scalars['Boolean']>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Template = {
  __typename?: 'Template';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
  alertType?: Maybe<Scalars['String']>;
  appCode?: Maybe<Scalars['String']>;
  templateVersions?: Maybe<Array<Maybe<TemplateVersion>>>;
  createdDate?: Maybe<Scalars['Date']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
};

export type TemplatePages = {
  __typename?: 'TemplatePages';
  totalElements?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
  content?: Maybe<Array<Maybe<Template>>>;
  isEmpty?: Maybe<Scalars['Boolean']>;
  isFirst?: Maybe<Scalars['Boolean']>;
  isLast?: Maybe<Scalars['Boolean']>;
  number?: Maybe<Scalars['Int']>;
  numberOfElements?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sort>;
};

export enum TemplateStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type TemplateVersion = {
  __typename?: 'TemplateVersion';
  templateId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  templateHash?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  status?: Maybe<TemplateStatus>;
  createdDate?: Maybe<Scalars['Date']>;
  lastModifiedDate?: Maybe<Scalars['Date']>;
};

export type Tenant = {
  __typename?: 'Tenant';
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
};

export type User = {
  __typename?: 'User';
  username?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  onboardings?: Maybe<Array<Maybe<Onboarding>>>;
};

export type CreateTemplateMutationVariables = Exact<{
  name: Scalars['String'];
  alertType: AlertType;
  appCode: Scalars['String'];
}>;

export type CreateTemplateMutation = { __typename?: 'Mutation' } & {
  createTemplate: { __typename?: 'Template' } & Pick<
    Template,
    'name' | 'uuid' | 'alertType' | 'appCode' | 'createdDate'
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
  templatePages?: Maybe<
    { __typename?: 'TemplatePages' } & Pick<
      TemplatePages,
      | 'isEmpty'
      | 'isFirst'
      | 'isLast'
      | 'number'
      | 'numberOfElements'
      | 'totalElements'
      | 'size'
    > & {
        content?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Template' } & Pick<
                Template,
                | 'name'
                | 'alertType'
                | 'id'
                | 'uuid'
                | 'appCode'
                | 'lastModifiedDate'
              >
            >
          >
        >;
        sort?: Maybe<
          { __typename?: 'Sort' } & Pick<
            Sort,
            'isSorted' | 'isUnsorted' | 'isEmpty'
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
      'id' | 'name' | 'uuid' | 'alertType' | 'appCode'
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

export const CreateTemplateDocument = gql`
  mutation CreateTemplate(
    $name: String!
    $alertType: AlertType!
    $appCode: String!
  ) {
    createTemplate(
      input: { name: $name, alertType: $alertType, appCode: $appCode }
    ) {
      name
      uuid
      alertType
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
    templatePages(
      name: $name
      appCodes: $appCodes
      paginationInput: {
        pageNumber: $pageNumber
        rowPerPage: $rowPerPage
        sortDirection: DESC
        sortField: "createdDate"
      }
    ) {
      content {
        name
        alertType
        id
        uuid
        appCode
        lastModifiedDate
      }
      isEmpty
      isFirst
      isLast
      number
      numberOfElements
      totalElements
      size
      sort {
        isSorted
        isUnsorted
        isEmpty
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
      alertType
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
