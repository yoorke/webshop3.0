(function () {
    'use strict';

    angular.module('webShopAdmin', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngFlash', 'ngAnimate', 'pascalprecht.translate', 'ckeditor', 'angular-confirm', 'ngContextMenu', 'scrollable-table', 'colorpicker.module', 'AxelSoft', 'lr.upload', 'uiSwitch', 'ui.tree', 'checklist-model', 'chart.js', 'ui.calendar', 'ui.sortable'])
    .config(config)
    .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider'];
    function config($routeProvider, $locationProvider, $translateProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'app/components/home/views/home.view.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/components/authentication/views/login.view.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'app/components/authentication/views/register.view.html',
                controllerAs: 'vm'
            })
            .when('/forgot-password', {
                controller: 'ForgotPassword',
                templateUrl: 'app/components/authentication/views/forgotPassword.view.html',
                controllerAs: 'vm'
            })
            .when('/reset-password', {
                controller: 'ResetPasswordController',
                templateUrl: 'app/components/authentication/views/resetPassword.view.html',
                controllerAs: 'vm'
            })
            .when('/profile-settings', {
                controller: 'UserProfileController',
                controllerAs: 'vm',
                templateUrl: 'app/components/authentication/views/userProfile.view.html',
                parentModelName: [],
                parentModelCompare: '',
                sortBy: '',
                sortReverse: false,
                modelName: 'UserProfile',
                getName: '',
                getParameters: [],
                itemModalView: '',
                itemModalController: '',
                itemModalSize: ''
            })
            .when('/users', {
                controller: 'DefaultController',
                controllerAs: 'vm',
                templateUrl: 'app/components/authentication/views/user.view.html',
                parentModelName: [],
                parentModelCompare: '',
                sortBy: 'Name',
                sortReverse: false,
                modelName: 'User',
                getName: 'get',
                getParameters: [],
                itemModalView: 'app/components/authentication/views/userModal.view.html',
                itemModalEditView: 'app/components/authentication/views/userModalEdit.view.html',
                itemModalController: 'UserController',
                itemModalSize: 'md',
                itemAddedMethod: 'noReload'
            })
            .when('/categories', {
                controller: 'DefaultController',
                controllerAs: 'vm',
                templateUrl: 'app/components/category/views/categoriesTable.view.html',
                parentModelName: [],
                parentModelCompare: '',
                sortBy: 'Name',
                sortReverse: false,
                modelName: 'Category',
                getName: 'getNestedTable',
                getParameters: [],
                itemModalView: 'app/components/category/views/categoryModal.view.html',
                itemModalController: 'CategoryModalController',
                itemModalSize: 'lg',
                itemAddedMethod: 'reload'
            })
            .when('/configuration', {
                controller: 'DefaultController',
                controllerAs: 'vm',
                templateUrl: 'app/components/configuration/views/configuration.view.html',
                parentModelName: [],
                parentModelCompare: '',
                sortBy: '',
                sortReverse: false,
                modelName: 'Configuration',
                getName: 'get',
                getParameters: [],
                itemModalView: '',
                itemModalController: '',
                itemModalSize: '',
                itemAddedMethod: ''
            });

        $translateProvider
            .useStaticFilesLoader({
                prefix: 'app/translations/',
                suffix: '.json'
            })
            .preferredLanguage('sr')
            .useLocalStorage()
            .useMissingTranslationHandlerLog();
    };

    run.$inject = ['GlobalService', '$location', '$cookieStore', '$http', '$cookies', '$rootScope'];
    function run(GlobalService, $location, $cookieStore, $http, $cookies, $rootScope) {
        GlobalService.SetCurrentUser($cookieStore.get('currentUser'));
        if (GlobalService.GetCurrentUser())
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + GlobalService.GetCurrentUser().access_token;
        GlobalService.LoadModelsParameters('routes');

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/forgot-password', '/reset-password']) === -1;
            var loggedIn = GlobalService.GetCurrentUser() != null;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        })
    }
})();