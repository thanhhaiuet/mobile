export enum ETableName {
	USERS = 'users',
	NEW = 'news',
	NEW_DRAFTS = 'new_drafts',
	COMMENT = 'comments',
	DONATION = 'donations',
}

export enum EGender {
	MALE = 1,
	FEMALE,
	NONE,
}

export enum EUserStatus {
	PENDING_VERIFY_ACCOUNT = 1,
	FORGOT_PASSWORD,
	ACTIVE,
	BLOCK,
	PENDING_VERIFY_CHANGE_EMAIL,
	UNSUBCRIBED,
}

export enum EPrefectureType {
	DOMESTIC = 1,
	FOREIGN,
}

export namespace NpProject {
	export enum EProjectType {
		ORGANIZATION = 1,
		INDIVIDUAL,
	}

	export enum EProjectPlanType {
		SIMPLE_PLAN = 1,
		FULL_SUPPORT_PLAN,
	}

	export enum EProjectLine {
		ALL_OR_NOTHING = 1, // project for benefit of owner
		ALL_IN, // project for volunteering
	}

	export enum EProjectStatus {
		WAIT_APPROVED = 1,
		APPROVED,
		REJECTED,
		CANCELED,
		TASSEI, // success
		NOT_TASSEI, // not success
	}

	export enum EAccountType {
		CURRENT = 1,
		SAVING,
	}

	export enum EPaperStatus {
		ALL_DONE = 1,
		PART_DONE,
		ALL_NOT_DONE,
		DONT_NEED,
	}

	export enum EPaymentStatus {
		UN_SETTLED = 1,
		SETTLED,
		PAYMENT_FAIL,
		CANCEL,
	}
}

export enum EProjectOrganizationAdditionalContactType {
	EMERGENCY = 1,
	PIC, // person in charge
}

export enum EProjectMediaType {
	MAIN_IMAGE = 1,
	EXTRA_IMAGE,
}

export enum EQuestionType {
	TEXT = 1,
	MULTI_CHOICE,
}

export enum EPaymentStatus {
	UNPAID = 1,
	PAID,
	CANCLED,
	REFUNDED,
	NOT_REFUNDED,
}

export enum EPaymentMethod {
	CREDIT_CARD = 1,
	BANK_CARD,
}

export enum EProjectNotificationType {
	NORMAL = 1,
	END,
}

export enum EExportType {
	BILL = 1,
	CERTIFICATE,
}

export enum EShipStatus {
	NOT_DELIVERY = 1,
	SHIP_SUCCESS,
	NOT_SHIP,
	SHIP_FAIL,
}

export enum EAdminType {
	ADMIN = 1,
	STAFF,
}

export enum EAdminStatus {
	ACTIVE = 1,
	INACTIVE,
}

export enum EBankAccountType {
	NOW_ACCOUNT = 1,
	CURRENT_ACCOUNT,
	SAVING_ACCOUNT,
}

export enum EStatusCategory {
	PUBLIC = 1,
	NOT_PUBLIC,
}

export enum ECategoryContact {
	PROJECT_SUPPORT = 1,
	PROJECT_POSTING,
	THE_SIMPLE_PLAN,
	FULL_SUPPORT_PLAN,
	THE_COMMUNITY,
	OPINIONS_ON_OUR_COMPANY,
	CONVERAGE_AND_MEDIA_PUBLICACTION,
	BUSINESS_OR_CORPORATE_SALES,
	OTHERS,
}
