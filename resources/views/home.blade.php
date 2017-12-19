@extends('layouts.app')

@section('content')
    <sidebar></sidebar>

    @if (Request::path()==="subject")
        <knows></knows>
    @elseif (Request::path()==="home")
        <example-component></example-component>
    @endif
@endsection
