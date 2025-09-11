<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('buildings', function (Blueprint $table) {
            $table->string('code')->after('name');
            $table->text('description')->after('owner_user_id');
            $table->dropColumn('settings');
            $table->text('thumbnail')->after('name');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('buildings', function (Blueprint $table) {
            $table->dropColumn('code');
            $table->dropColumn('thumbnail');
            $table->dropColumn('description');
        });
    }
};
