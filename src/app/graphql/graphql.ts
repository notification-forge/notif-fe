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

export type CloneTemplateVersionInput = {
  templateId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
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
  tenant?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  imageData?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTemplate: Template;
  updateTemplate: Template;
  createTemplateVersion: TemplateVersion;
  cloneTemplateVersion: TemplateVersion;
  updateTemplateVersion: TemplateVersion;
  uploadImage: Image;
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
  image: Scalars['Upload'];
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
      'isEmpty' | 'isFirst' | 'isLast' | 'number' | 'numberOfElements' | 'size'
    > & {
        content?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Template' } & Pick<
                Template,
                | 'name'
                | 'alertType'
                | 'id'
                | 'appCode'
                | 'createdDate'
                | 'lastModifiedDate'
              > & {
                  templateVersions?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'TemplateVersion' } & Pick<
                          TemplateVersion,
                          | 'id'
                          | 'name'
                          | 'body'
                          | 'settings'
                          | 'version'
                          | 'status'
                        >
                      >
                    >
                  >;
                }
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
        sortDirection: ASC
        sortField: "name"
      }
    ) {
      content {
        name
        alertType
        id
        appCode
        createdDate
        lastModifiedDate
        templateVersions {
          id
          name
          body
          settings
          version
          status
        }
      }
      isEmpty
      isFirst
      isLast
      number
      numberOfElements
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
